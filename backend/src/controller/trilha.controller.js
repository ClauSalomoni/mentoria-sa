import pkg from 'sequelize';
const { where } = pkg;
import { trilha, planoEstudo, historicoAvaliacao, } from "../models/index.js";
import { gerarRespostaGemini } from '../../services/geminiService.js'
import { parseRespostaIA } from "../../utils/parseUtil.js";
/*
  POST /trilhas/avaliacao
  Gera a prova diagnóstica
*/
export async function gerarAvaliacao(req, res) {
  try {
    const { area } = req.body;

    const prompt = `

      
      
      Atue como especialista em educação e tecnologia. Gere uma prova diagnóstica sobre ${area}.
    Regras:
    - Gere exatamente 10 questões
    - Deve ter 5 alternativas em cada questão
    - Apenas 1 alternativa deve ser correta
    - Misture níveis de dificuldade
    - Evite perguntas repetidas
    - Retorne apens JSON.
    - Misture a resposta correta entre as diferentes alternativas
    - Não exiba a resposta para o usuário
    - A prova deve avaliar se o aluno é INICIANTE, INTERMEDIARIO ou AVANCADO.
    
    Retorne APENAS um JSON neste formato:
      {
        "area": "${area}",
        "questoes": [
          {
            "pergunta": "Texto da pergunta",
            "alternativas": ["A", "B", "C", "D", "E"],
            "respostaCorreta": "A"
          }
        ]
      }

      Gere 10 questões.      
    `;

    const respostaIA = await gerarRespostaGemini(prompt);
    
    const avaliacao = parseRespostaIA(respostaIA)
    

    return res.status(200).json(avaliacao);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao gerar avaliação",
      erro: error.message,
    });
  }
}

/*
  POST /trilhas/avaliacao/responder
  Corrige a avaliação, salva histórico, cria trilha e planos
*/
export async function responderAvaliacao(req, res) {
  try {
    const { area, respostas } = req.body;

    const prompt = `
      Corrija a avaliação diagnóstica do aluno sobre ${area}.

      Respostas enviadas pelo aluno (contém o enunciado ou ID e a alternativa escolhida):
      ${JSON.stringify(respostas)}

      Com base nas respostas:
      1. Calcule o total de acertos, pontuação de 0 a 10;
      2. Classifique o aluno estritamente como INICIANTE, INTERMEDIARIO ou AVANCADO (use exatamente estes termos em caixa alta, sem acentos)
      3. A Classificação deve respeitar o numero de acertos: de 0 à 4 acertos é nível INICIANTE, de 5 à 7 nivel INTERMEDIARIO, de 8 á 10 é nivel AVANCADO. 
      4. Para CADA resposta enviada, informe se o aluno acertou ou errou para montarmos o relatório visual.
      5. Gere uma trilha personalizada de estudos de acordo com o nível de conhecimento e a área desejada;
      6. Gere planos de estudo para essa trilha.

      Retorne APENAS um JSON neste formato:

      {
        "pontuacao": 8,
        "totalQuestoes": 10,
        "nivelAnterior": "INICIANTE",
        "nivelAtual": "INTERMEDIARIO",
        "detalhes": [
          { "questaoId": 1, "correto": true },
          { "questaoId": 2, "correto": false }
        ],
        "trilha": {
          "nome": "Trilha de ${area}",
          "area": "Trilha de ${area}",
          "nivelObjetivo": "AVANCADO",
          "planos": [
            {
              "titulo": "Variáveis e tipos de dados",
              "descricao": "Estudar variáveis, tipos primitivos e entrada de dados.",
              "tempoEstimado": "2h",
              "ordem": 1
            }
          ]
        }
      }
    `;

    const respostaIA = await gerarRespostaGemini(prompt);
    
   
    const dados = parseRespostaIA(respostaIA);

    const novaTrilha = await trilha.create({
      nome: dados.trilha.nome,
      area: dados.trilha.area,
      nivelAtual: dados.nivelAtual,
      nivelObjetivo: dados.trilha.nivelObjetivo,
      status: "EM_ANDAMENTO",
      userId: req.user.id,
    });

    const historicoSalvo = await historicoAvaliacao.create({
      pontuacao: dados.pontuacao,
      nivelAnterior: dados.nivelAnterior,
      nivelAtual: dados.nivelAtual,
      // dataAvaliacao: new Date(),
      trilhaId: novaTrilha.id,
    });

    const planos = await planoEstudo.bulkCreate(
      dados.trilha.planos.map((plano) => {
        // EXTRAI APENAS OS NÚMEROS DO TEXTO (Ex: "2h" ou "2 horas" vira 2)
        const horasNumericas = parseFloat(String(plano.tempoEstimado || '').replace(/[^0-9.]/g, ''));
        return {
        titulo: plano.titulo,
        descricao: plano.descricao,
        tempoEstimado: Number.isNaN(horasNumericas) ? 2.0 : horasNumericas,
        ordem: plano.ordem,
        progresso: 0,
        status: "PENDENTE",
        trilhaId: novaTrilha.id,
        }
      })
    );
    // 4. Monta a resposta do Front-end unificando os dados reais salvos
    const respostaFormatada = {
      avaliacao: {
        id: historicoSalvo.id,
        dataAvaliacao: historicoSalvo.dataAvaliacao,
        totalQuestoes: dados.totalQuestoes || 10,
        acertos: dados.pontuacao,
        nivelVerificado: dados.nivelAtual,
        detalhes: dados.detalhes || []
      },
      mensagem: "Avaliação corrigida, trilha criada e planos salvos com sucesso.",
      trilha: novaTrilha,
      planos: planos
    };
    

    return res.status(201).json(respostaFormatada);
  } catch (error) {
    console.error("Erro ao responder avaliação e gerar trilha: ", error)
    return res.status(500).json({
      mensagem: "Erro ao responder avaliação e gerar trilha"
    });
  }
}

/*
  GET /trilhas
*/
export async function listarTrilhas(req, res) {
  try {
    const trilhas = await trilha.findAll({
      where: {
        userId: req.user.id,
      },
      include: [planoEstudo],
    });

    const trilhasFormatadas = trilhas.map(t => {
    const item = t.toJSON();
    
    // Captura o array correto vindo da aba redes do seu Sequelize
    const listaPlanos = item.planoEstudos || []; 
    
    return {
      ...item,
      planos: listaPlanos,         // Garante a leitura do Front-end que busca por .planos
      planoEstudos: listaPlanos    // Mantém o padrão original caso outra tela dependa dele
    };
  });
 

    return res.status(200).json(trilhasFormatadas);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao listar as trilhas",
      erro: error.message,
    });
  }
}

/*
  GET /trilhas/:id
*/
export async function buscarTrilha(req, res) {
  try {
    const { id } = req.params;

    const trilhaEncontrada = await trilha.findOne({
      where: {
        id,
        userId: req.user.id,
      },
      include: [planoEstudo],
    });

    if (!trilhaEncontrada) {
      return res.status(404).json({
        mensagem: "Trilha não encontrada",
      });
    }

    return res.status(200).json(trilhaEncontrada);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar a trilha",
      erro: error.message,
    });
  }
}

/*
  PUT /trilhas/:id
*/
export async function atualizarTrilha(req, res) {
  try {
    const { id } = req.params;

    const trilhaEncontrada = await trilha.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!trilhaEncontrada) {
      return res.status(404).json({
        mensagem: "Trilha não encontrada",
      });
    }

    await trilhaEncontrada.update(req.body);

    return res.status(200).json(trilhaEncontrada);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao atualizar a trilha",
      erro: error.message,
    });
  }
}
export async function criarTrilha(req, res) {
  try { 
    const { nome, nivelAtual, nivelObjetivo } = req.body
    
    if( !nome || !nivelObjetivo) {
      return res.status(400).json({ mensagem: " Nome e nivel do objetivo são obrigatórios"})
    }
    const prompt = `
    Atue como especialista em educação e tecnologia. Gere uma trilha personalizada de estudos.
      
      Tema/Nome da Trilha: ${nome}
      Nível Atual do Aluno: ${nivelAtual || 'INICIANTE'}
      Nível Objetivo: ${nivelObjetivo}

      Regras:
      - Crie um cronograma lógico e sequencial de aprendizado.
      - Divida a trilha em planos de estudo (módulos/etapas).
      - Retorne APENAS um JSON válido.

      Retorne APENAS um JSON neste formato:
      {
        "nome": "Trilha personalizada de ${nome}",
        "planos": [
          {
            "titulo": "Nome do tópico",
            "descricao": "O que estudar nessa etapa.",
            "tempoEstimado": "2h",
            "ordem": 1
          }
        ]
      }
    
    `
    const respostaIa = await gerarRespostaGemini(prompt)
    console.log(respostaIa, "Verificação 1")
    
   
    const dados = parseRespostaIA(respostaIa)
    console.log(dados, "Verificação 2")

    const trilhaNova = await trilha.create({
      nome: nome,
      nivelAtual: nivelAtual || "INICIANTE",
      nivelObjetivo: nivelObjetivo.toUpperCase(),
      status: "EM_ANDAMENTO",
      userId: req.user.id
    });
    // 2. Cria em lote (bulkCreate) os planos gerados pela IA
    const planos = await planoEstudo.bulkCreate(
      dados.planos.map((plano) => {
      const horasNumericas = parseFloat(String(plano.tempoEstimado || '').replace(/[^0-9.]/g, ''));
      return  {
          titulo: plano.titulo,
          descricao: plano.descricao,
          tempoEstimado: Number.isNaN(horasNumericas) ? 2.0 : horasNumericas,
          ordem: plano.ordem,
          progresso: 0,
          status: "PENDENTE",
          trilhaId: trilhaNova.id,
          };
      })
    );

    return res.status(201).json({
      mensagem: "Trilha criada com sucesso através de IA!",
      trilha: trilhaNova,
      planos
    });

  } catch (error) {
    console.error("Erro ao criar trilha com IA: ",error)
    return res.status(500).json({
      mensagem: "Erro ao criar trilha com IA"
    });
  }
}


/*
  DELETE /trilhas/:id
*/
export async function excluirTrilha(req, res) {
  try {
    const { id } = req.params;

    const trilhaEncontrada = await trilha.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!trilhaEncontrada) {
      return res.status(404).json({
        mensagem: "Trilha não encontrada",
      });
    }

    await trilhaEncontrada.destroy();

    return res.status(200).json({
      mensagem: "Trilha excluída com sucesso",
    });
  } catch (error) {
    console.error("Erro ao excluir a trilha: ", error)
    return res.status(500).json({
      mensagem: "Erro ao excluir a trilha"
    });
  }
}

// No seu controller do backend
export async function obterHistoricoAvaliacoes(req, res) {
  try {
    const userId = req.user.id;

    // Buscamos as avaliações que pertencem às trilhas criadas por este usuário
    const avaliacoes = await historicoAvaliacao.findAll({
      include: [{
        model: trilha,
        where: { userId },
        attributes: ['nome'] // Traz o nome da trilha para exibir na tabela
      }],
      order: [["dataAvaliacao", "DESC"]], 
    });

    return res.status(200).json(avaliacoes);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar histórico de avaliações.",
      erro: error.message,
    });
  }
}