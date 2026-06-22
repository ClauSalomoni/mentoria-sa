import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

export const historicoAvaliacaoProfe = sequelize.define("historicoAvaliacaoProfe", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pontuacao: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    nivelAnterior: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nivelAtual: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW

    }
})