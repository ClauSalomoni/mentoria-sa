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
        unique: {
            msg: "Este e-mail já está cadastrado!"
        },
        validate: {
            isEmail: {
                args: true,
                msg: "Por favor insira um e-mail válido."
            }
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: {
                args: [8, 255],
                msg: "A senha deve ter pelo menos 8 caracteres"
            }
        }
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    
})