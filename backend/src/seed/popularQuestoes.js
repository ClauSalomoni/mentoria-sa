// src/seeds/runSeed.js
import 'dotenv/config';
import sequelize from "../database/db.js";
import { Questao } from "../models/questao.model.js";
import { BANCO_DE_QUESTOES } from "./seedQuestoes.js";

async function popularBanco() {
    try {
        await sequelize.sync(); // Garante que a tabela 'questoes' existe
        
        // Insere todas as questões em massa
        await Questao.bulkCreate(BANCO_DE_QUESTOES);
        
        console.log("✅ Banco de dados populado com sucesso!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Erro ao popular banco:", error);
        process.exit(1);
    }
}

popularBanco();