import sequelize from "../database/db.js";
import pkg from 'sequelize';
const { DataTypes } = pkg;

export const planoEstudo = sequelize.define("planoEstudo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING
    },
    descricao: {
        type: DataTypes.TEXT
    },
    tempoEstimado: {
        type: DataTypes.FLOAT
    },
    ordem: {
        type: DataTypes.INTEGER
    },
    progresso: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM("PENDENTE" , "EM_ANDAMENTO", "CONCLUIDO"),
        defaultValue: "PENDENTE"
    }
    
})
