// src/models/questao.model.js
import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

export const Questao = sequelize.define('Questao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    area: {
        type: DataTypes.STRING, // "javascript", "postgresql", "logica", "fullstack"
        allowNull: false
    },
    nivel: {
        type: DataTypes.ENUM('iniciante', 'intermediario', 'avancado'),
        allowNull: false
    },
    enunciado: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    opcoes: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Guarda as 5 alternativas: ["Opção A", "Opção B", ...]
        allowNull: false,
        validate: {
            // Garante que sempre terá exatamente 5 alternativas
            isValidLength(value) {
                if (value.length !== 5) {
                    throw new Error('A questão deve ter exatamente 5 alternativas.');
                }
            }
        }
    },
    respostaCorreta: {
        type: DataTypes.INTEGER, // Guarda o índice da resposta certa (de 0 a 4)
        allowNull: false
    }
}, {
    tableName: 'questoes'
});