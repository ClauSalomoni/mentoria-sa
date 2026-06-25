// //    ABAIXO codigo antigo...
// import sequelize from "../database/db.js";
// import pkg from 'sequelize';
//const { DataTypes } = pkg;
// import { Curso } from "./curso.model.js"; // Importa o model de curso acima

// export const Aula = sequelize.define('Aula', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     titulo: {
//         type: DataTypes.STRING,
//         allowNull: false // Ex: "01 - Introdução ao Sequelize"
//     },
//     ordem: {
//         type: DataTypes.INTEGER,
//         allowNull: false // Usado para ordenar a fila de reprodução (1, 2, 3...)
//     },
//     videoUrl: {
//         type: DataTypes.STRING,
//         allowNull: true // URL de incorporação (embed) do vídeo
//     },
//     materialUrl: {
//         type: DataTypes.STRING,
//         allowNull: true // URL do PDF ou arquivo de apoio
//     },
//     descricao: {
//         type: DataTypes.TEXT,
//         allowNull: true
//     }
// }, {
//     tableName: 'aulas'
// });

// // Relacionamento: Um Curso tem muitas Aulas
// Curso.hasMany(Aula, { foreignKey: 'cursoId', onDelete: 'CASCADE' });
// Aula.belongsTo(Curso, { foreignKey: 'cursoId' });