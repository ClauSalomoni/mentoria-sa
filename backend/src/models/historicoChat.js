import sequelize from "../database/db.js";
import pkg from 'sequelize';
const { DataTypes } = pkg;

export const historicoChat = sequelize.define('historicoChat', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pergunta: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        resposta: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        dataHora: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    }
)