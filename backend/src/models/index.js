// INICIANDO OS MODELOS VIA ARQUIVO CENTRAL!
import { User } from "./user.model.js";
import { Curso } from "./curso.model.js";
//import { Matricula } from "./A.matricula.model.js"; // Se o arquivo existir
//import { Aula } from "./A.aula.model.js";
//import { Trilha } from "./A.trilha.model.js";
// import { Avaliacao } from "./A.avaliacao.model.js";
// import { Questao } from "./A.questao.model.js";

//importar  abaixo o que fizemos em aula dia 18/06
import { trilha } from "./trilha.model.js";
import { planoEstudo } from "./planoEstudo.model.js";
import { historicoAvaliacao } from "./historicoAvaliacao.model.js"
import { historicoChat} from './historicoChat.js'


User.hasMany(trilha, {
    foreignKey: "userId", onDelete: 'CASCADE'
})
trilha.belongsTo(User, {
    foreignKey: "userId",
})
trilha.hasMany(planoEstudo, {
    foreignKey: "trilhaId",
})
planoEstudo.belongsTo(trilha, {
    foreignKey: "trilhaId",
})
historicoAvaliacao.belongsTo(trilha, {
    foreignKey: "trilhaId",
})
trilha.hasMany(historicoAvaliacao, {
    foreignKey: "trilhaId"
})
User.hasMany(historicoChat, {
        foreignKey: "userId", onDelete: 'CASCADE'
})

historicoChat.belongsTo(User, {
        foreignKey: "userId"})

export {User, trilha, planoEstudo, historicoAvaliacao, historicoChat}



                //   ABAIXO codigo ANTIGO
// 1. Relação Usuário <-> Cursos (Matrícula)
// User.belongsToMany(Curso, { through: Matricula, foreignKey: 'userId' });
// Curso.belongsToMany(User, { through: Matricula, foreignKey: 'cursoId' });

// // 2. Relação Curso <-> Aulas
// Curso.hasMany(Aula, { foreignKey: 'cursoId', onDelete: 'CASCADE' });
// Aula.belongsTo(Curso, { foreignKey: 'cursoId' });

// // 3. Relação Usuário <-> Trilhas da IA
// User.hasMany(Trilha, { foreignKey: 'userId', onDelete: 'CASCADE' });
// Trilha.belongsTo(User, { foreignKey: 'userId' });

// User.hasMany(Avaliacao, { foreignKey: 'userId', onDelete: 'CASCADE' });
// Avaliacao.belongsTo(User, { foreignKey: 'userId' });

// // Exporta tudo centralizado para o resto do servidor usar
// export { User, Curso, Matricula, Aula, Trilha, Avaliacao, Questao };