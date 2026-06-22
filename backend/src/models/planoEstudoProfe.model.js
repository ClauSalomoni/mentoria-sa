import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

export const planoEstudoProfe = sequelize.define("planoEstudoProfe", {
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
        type: DataTypes.ENUM("NAO_INICIADO" , "EM_ANDAMENTO", "CONCLUIDO"),
        defaultValue: "NAO_INICIADO"
    }
    
})
