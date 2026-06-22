import { where } from "sequelize";
import { trilhaProfe, planoEstudoProfe, historicoAvaliacaoProfe } from "../models/index.js";
import { gerarConteudo } from './services/geminiService.js'
/*
  POST /trilhas/avaliacao
  Gera a prova diagnóstica
*/
export async function gerarAvaliacao(req, res) {
  try {
    const { area } = req.body;

    const prompt = `
      Gere uma prova diagnóstica sobre ${area}.

      A prova deve avaliar se o aluno é Básico, Intermediário ou Avançado.

      Retorne APENAS um JSON neste formato:
      {
        "area": "${area}",
        "questoes": [
          {
            "pergunta": "Texto da pergunta",
            "alternativas": ["A", "B", "C", "D"],
            "respostaCorreta": "A"
          }
        ]
      }

      Gere 10 questões.
    `;

    const respostaIA = await gerarRespostaGemini(prompt);
    const avaliacao = JSON.parse(respostaIA);

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

      Respostas do aluno:
      ${JSON.stringify(respostas)}

      Com base nas respostas:
      1. Calcule a pontuação de 0 a 10;
      2. Classifique o aluno como Básico, Intermediário ou Avançado;
      3. Gere uma trilha personalizada de estudos;
      4. Gere planos de estudo para essa trilha.

      Retorne APENAS um JSON neste formato:

      {
        "pontuacao": 8,
        "nivelAnterior": "Básico",
        "nivelAtual": "Intermediário",
        "trilha": {
          "nome": "Trilha de Lógica de Programação",
          "area": "Lógica de Programação",
          "nivelObjetivo": "Avançado",
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
    const dados = JSON.parse(respostaIA);

    const novaTrilha = await trilha.create({
      nome: dados.trilha.nome,
      area: dados.trilha.area,
      nivelAtual: dados.nivelAtual,
      nivelObjetivo: dados.trilha.nivelObjetivo,
      status: "EM_ANDAMENTO",
      userId: req.user.id,
    });

    const avaliacao = await historicoAvaliacaoProfe.create({
      pontuacao: dados.pontuacao,
      nivelAnterior: dados.nivelAnterior,
      nivelAtual: dados.nivelAtual,
      dataAvaliacao: new Date(),
      userId: req.user.id,
      trilhaId: novaTrilha.id,
    });

    const planos = await planoEstudoProfe.bulkCreate(
      dados.trilha.planos.map((plano) => ({
        titulo: plano.titulo,
        descricao: plano.descricao,
        tempoEstimado: plano.tempoEstimado,
        ordem: plano.ordem,
        progresso: 0,
        status: "PENDENTE",
        trilhaId: novaTrilha.id,
      }))
    );

    return res.status(201).json({
      mensagem: "Avaliação corrigida, trilha criada e planos salvos com sucesso.",
      avaliacao,
      trilha: novaTrilha,
      planos,
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao responder avaliação e gerar trilha",
      erro: error.message,
    });
  }
}

/*
  GET /trilhas
*/
export async function listarTrilhas(req, res) {
  try {
    const trilhas = await trilhaProfe.findAll({
      where: {
        userId: req.user.id,
      },
      include: [planoEstudo],
    });

    return res.status(200).json(trilhas);
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
    return res.status(500).json({
      mensagem: "Erro ao excluir a trilha",
      erro: error.message,
    });
  }
}