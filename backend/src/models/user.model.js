import sequelize from "../database/db.js";
import pkg from 'sequelize';
const { DataTypes } = pkg;

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
   
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null // Começa com o 'avatar' :) que o front usa como fallback)
    },
    
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    //RBAC:: definindo roles
    role: {
        type: DataTypes.ENUM('aluno', 'admin'),
        defaultValue: 'aluno', 
        allowNull: false
    }
    
})