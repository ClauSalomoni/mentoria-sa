import sequelize from "../database/db.js";
import pkg from 'sequelize';
const { DataTypes } = pkg;

export const historicoAvaliacao = sequelize.define("historicoAvaliacao", {
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
    dataAvaliacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW

    }
})