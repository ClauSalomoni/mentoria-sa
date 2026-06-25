// src/models/curso.model.js    ABAIXO codigo ANTIGO RENDERIZADO
import sequelize from "../database/db.js";
import pkg from 'sequelize';
const { DataTypes } = pkg;
import { User } from "./user.model.js"; // Importa o seu model de usuário existente

export const Curso = sequelize.define('Curso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cor: {
        type: DataTypes.STRING,
        defaultValue: "#aa3bff" // Cor padrão roxa caso não seja enviada
    }
}, {
    tableName: 'cursos' // Força o nome da tabela em minúsculo no Postgres
});

