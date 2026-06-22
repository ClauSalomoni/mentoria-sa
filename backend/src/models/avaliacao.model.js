// src/models/avaliacao.model.js
import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";

export const Avaliacao = sequelize.define('Avaliacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    area: {
        type: DataTypes.STRING, // Ex: "javascript"
        allowNull: false
    },
    pontuacao: {
        type: DataTypes.INTEGER, // Ex: 80 (significa 80% de acertos)
        allowNull: false
    },
    nivelVerificado: {
        type: DataTypes.ENUM('iniciante', 'intermediario', 'avancado'),
        allowNull: false
    },
    // Aqui você guarda um histórico de quais IDs o usuário respondeu e o que ele marcou
    // Ex de JSON: [ { "questaoId": 12, "respostaDoUsuario": 3, "acertou": true } ]
    historicoRespostas: {
        type: DataTypes.JSONB, 
        allowNull: false
    }
}, {
    tableName: 'avaliacoes'
});

// Relacionamento: Um usuário pode fazer várias avaliações ao longo do tempo
User.hasMany(Avaliacao, { foreignKey: 'userId', onDelete: 'CASCADE' });
Avaliacao.belongsTo(User, { foreignKey: 'userId' });