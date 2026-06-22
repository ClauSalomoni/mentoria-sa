// src/models/trilha.model.js
import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js"; // Importa para fazer o relacionamento

export const Trilha = sequelize.define('Trilha', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false // Ex: "frontend"
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false // Ex: "Iniciante"
    },
    cronograma: {
        // Usamos JSONB porque o Postgres gerencia objetos JSON de forma ultra performática.
        // Isso permite que a IA responda um JSON complexo e o banco salve perfeitamente.
        type: DataTypes.JSONB, 
        allowNull: false
    }
}, {
    tableName: 'trilhas'
});

// ◄ RELACIONAMENTO (Chaves Estrangeiras)
// Um Usuário pode gerar muitas Trilhas (Histórico)
User.hasMany(Trilha, { foreignKey: 'userId', onDelete: 'CASCADE' });
Trilha.belongsTo(User, { foreignKey: 'userId' });