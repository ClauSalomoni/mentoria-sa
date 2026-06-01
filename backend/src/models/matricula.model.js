//Unindo o auluno ao curso

import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";
import { Curso } from "./curso.model.js";

export const Matricula = sequelize.define('Matricula', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    progresso: { type: DataTypes.INTEGER, defaultValue: 0 } // O progresso agora é INDIVIDUAL de cada aluno!
}, { tableName: 'matriculas' });

// Cria as chaves estrangeiras automaticamente e une as tabelas
User.belongsToMany(Curso, { through: Matricula, foreignKey: 'userId' });
Curso.belongsToMany(User, { through: Matricula, foreignKey: 'cursoId' });