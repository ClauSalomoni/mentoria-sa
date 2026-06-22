import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

export const historicoChatProfe = sequelize.define('historicoChatProfe', 
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