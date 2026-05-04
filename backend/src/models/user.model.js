//cRiar Classes das tabelas
// Aqui configuramos nosso codigo de acordo com o DB que temos!
import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true}
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [8, 255]
        }
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    
})