// src/controllers/trilha.controller.js
import { Trilha } from "../models/trilha.model.js";

export const salvarTrilhaIA = async (req, res) => {
    try {
        const { area, nivel, cronograma } = req.body;
        const userId = req.user.id; // Middleware de autenticação injeta isso aqui

        // Cria o registro no Postgres via Sequelize mapeando o userId automaticamente
        const novaTrilha = await Trilha.create({
            area,
            nivel,
            cronograma, // O objeto JSON vindo do MentorIA
            userId
        });

        return res.status(201).json({
            sucesso: true,
            mensagem: "Trilha da MentorIA salva com sucesso!",
            dados: novaTrilha
        });

    } catch (error) {
        console.error("Erro ao salvar trilha:", error);
        return res.status(500).json({ erro: "Erro interno no servidor ao salvar trilha." });
    }
};

// GET /trilha/minhas-trilhas
export const listarTrilhasDoAluno = async (req, res) => {
    try {
        const userId = req.user.id; // Pega o ID do usuário logado pelo middleware

        // Busca todas as trilhas onde o userId bate com o aluno logado
        const trilhas = await Trilha.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']] // Traz as mais recentes primeiro
        });

        return res.json(trilhas);
    } catch (error) {
        console.error("Erro ao buscar trilhas:", error);
        return res.status(500).json({ erro: "Erro ao carregar o histórico de trilhas." });
    }
};