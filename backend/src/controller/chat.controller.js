import {
  trilha,
  planoEstudo,
  historicoAvaliacao,
  historicoChat,
} from "../models/index.js";

import { gerarRespostaGemini } from "../../services/geminiService.js";

export async function perguntarChat(req, res) {
  try {
    const pergunta = req.body.mensagem;
    const userId = req.user.id;
        
    if (!pergunta) {
      return res.status(400).json({
        mensagem: "A pergunta é obrigatória.",
      });
    }

    const trilhas = await trilha.findAll({
      where: { userId },
      include: [planoEstudo],
    });


// DINÂMICO: Pegamos o ID da trilha mais recente criada por este usuário
    const trilhaId = trilhas.length > 0 ? trilhas[trilhas.length - 1].id : null;
    let promptCompleto = "";

    if (trilhaId) {
      const avaliacoes = await historicoAvaliacao.findAll({
        where: { trilhaId },
        order: [["createdAt", "DESC"]],
      });
     promptCompleto = `TRILHAS DO ALUNO:
      ${JSON.stringify(trilhas, null, 2)}

      AVALIAÇÕES DO ALUNO:
      ${JSON.stringify(avaliacoes, null, 2)}
      `
    }

    const conversas = await historicoChat.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    let selectPrompt = promptCompleto ? promptCompleto : "O aluno ainda não possui trilhas registradas.";
    const prompt = `
Você é a MentorIA, uma mentora educacional inteligente.

Responda ao aluno considerando o histórico dele na plataforma.

CONTEXTO DO ALUNO:
${selectPrompt}

ÚLTIMAS CONVERSAS:
${JSON.stringify(conversas, null, 2)}

PERGUNTA ATUAL:
${pergunta}

REGRAS:
- Responda em português de forma didática.
- Considere o nível atual do aluno informado no contexto.
- Sugira próximos passos baseados nos planos de estudo dele.

`;

    const respostaIA = await gerarRespostaGemini(prompt);

    const conversaSalva = await historicoChat.create({
      pergunta,
      resposta: respostaIA,
      dataHora: new Date(),
      userId,
    });
    

    return res.status(201).json({
      mensagem: "Resposta gerada com sucesso.",
      resposta: respostaIA,
      conversa: conversaSalva,
    });
  } catch (error) {
    console.error("Erro ao conversar com a IA: ", error)
    return res.status(500).json({
      mensagem: "Erro ao conversar com a IA."
    });
  }
}

export async function obterHistoricoChat(req, res) {
  try {
    const userId = req.user.id;

    const historico = await historicoChat.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]], 
    });

    return res.status(200).json(historico);
  } catch (error) {
    console.error("Erro ao buscar histórico do chat: ", error)
    return res.status(500).json({
      mensagem: "Erro ao buscar histórico do chat."
    });
  }
}

