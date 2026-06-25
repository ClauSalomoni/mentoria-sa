import sequelize from "../database/db.js";
import pkg from 'sequelize';
const { DataTypes } = pkg;

export const trilha = sequelize.define('trilha', {
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
        allowNull: true,
        set(value) {
            if (value) this.setDataValue('nivelAtual', value.trim().toUpperCase());
        }
    },
    nivelObjetivo: {
        type: DataTypes.ENUM("INICIANTE" , "INTERMEDIARIO", "AVANCADO"),
        allowNull: false,
        set(value) {
            if (value) this.setDataValue('nivelObjetivo', value.trim().toUpperCase());
        }
       
    },
     status: {
        type: DataTypes.ENUM("NAO_INICIADO" , "EM_ANDAMENTO", "CONCLUIDO"),
        defaultValue: "NAO_INICIADO"
    }
    

})
