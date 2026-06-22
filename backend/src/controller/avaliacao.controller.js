import sequelize from "../database/db.js";
import { Questao } from "../models/questao.model.js";
import { Avaliacao } from "../models/avaliacao.model.js";


// PARA CONSUMIR no FRONT: fetch('/api/avaliacao/questoes?area=javascript')
// 1. GERAR SIMULADO (Busca questões soltas aleatoriamente)
export async function gerarSimulado(req, res) {
    try {
        const { area } = req.query; // Ex: /questoes?area=javascript

        if (!area) {
            return res.status(400).json({ message: "A área de conhecimento é obrigatória." });
        }

        // Busca 10 questões aleatórias daquela área específica
        const questoes = await Questao.findAll({
            where: { area },
            order: sequelize.fn('RANDOM'), // Faz o Postgres embaralhar as linhas
            limit: 10,
            // ATENÇÃO: Excluímos a 'respostaCorreta' para o aluno não ver inspecionando o código no Front
            attributes: { exclude: ['respostaCorreta'] } 
        });

        return res.json(questoes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao gerar o simulado", detalhes: error.message });
    }
}

// 2. PROCESSAR RESPOSTAS (Corrige o teste e salva o nível)
export async function processarRespostas(req, res) {
    try {
        const { area, respostas } = req.body; 
        // O Front envia o formato: respostas = [{ questaoId: 1, respostaUsuario: 3 }, ...]
        
        const userId = req.user.id; // Pego direto do token autenticado
        let acertos = 0;
        let totalQuestoes = respostas.length;
        let resumoHistorico = [];

        if (!respostas || totalQuestoes === 0) {
            return res.status(400).json({ message: "Nenhuma resposta foi enviada." });
        }

        // Loop para checar cada resposta direto no Banco de Dados
        for (const item of respostas) {
            const questao = await Questao.findByPk(item.questaoId);

            if (!questao) continue;

            const acertou = item.respostaUsuario === questao.respostaCorreta;
            if (acertou) acertos++;

            // Monta o objeto que vai para a coluna JSONB de histórico
            resumoHistorico.push({
                questaoId: questao.id,
                enunciado: questao.enunciado,
                respostaDoUsuario: item.respostaUsuario,
                respostaCorreta: questao.respostaCorreta,
                acertou: acertou
            });
        }

        // Calcula a porcentagem de acertos
        const pontuacao = Math.round((acertos / totalQuestoes) * 100);

        // Define o nível baseado na performance do aluno
        let nivelVerificado = "iniciante";
        if (pontuacao >= 80) {
            nivelVerificado = "avancado";
        } else if (pontuacao >= 50) {
            nivelVerificado = "intermediario";
        }
        
        // Salva a tentativa na tabela separada 'avaliacoes'
        const novaAvaliacao = await Avaliacao.create({
            userId,
            area,
            pontuacao,
            nivelVerificado,
            historicoRespostas: resumoHistorico
        });

        // 🚀 SEGURANÇA: Filtra o histórico para o React receber apenas o feedback visual,
        // ocultando a coluna 'respostaCorreta' original do banco de dados.
        const detalhesParaOFront = resumoHistorico.map(item => ({
            questaoId: item.questaoId,
            correto: item.acertou
        }));

        // Retorna o resultado imediatamente para o React mostrar na tela
        return res.status(201).json({
            message: "Simulado concluído!",
            pontuacao,
            nivelVerificado,
            totalQuestoes,
            acertos,
            detalhes: detalhesParaOFront
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao processar as respostas", detalhes: error.message });
    }
}