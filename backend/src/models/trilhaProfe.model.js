import sequelize from "../database/db.js";
import { DataTypes, STRING } from "sequelize"

export const trilhaProfe = sequelize.define('trilhaProfe', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    nivelAtual: {
        type: DataTypes.ENUM("INICIANTE" , "INTERMEDIARIO", "AVANCADO"),
        allowNull: true
    },
    nivelObjetivo: {
        type: DataTypes.ENUM("INICIANTE" , "INTERMEDIARIO", "AVANCADO"),
        allowNull: false
       
    },
     status: {
        type: DataTypes.ENUM("NAO_INICIADO" , "EM_ANDAMENTO", "CONCLUIDO"),
        defaultValue: "NAO_INICIADO"
    }
    

})
