// INICIANDO OS MODELOS VIA ARQUIVO CENTRAL!
import { User } from "./user.model.js";
import { Curso } from "./curso.model.js";
import { Matricula } from "./matricula.model.js"; // Se o arquivo existir
import { Aula } from "./aula.model.js";
import { Trilha } from "./trilha.model.js";
import { Avaliacao } from "./avaliacao.model.js";
import { Questao } from "./questao.model.js";

//importar  abaixo o que fizemos em aula dia 18/06
                                    // import { trilhaProfe } from "./trilhaProfe.model.js";
                                    // import { planoEstudoProfe } from "./planoEstudoProfe.model.js";
                                    // import { historicoAvaliacaoProfe } from "./historicoAvaliacaoProfe.model.js"


                                    // User.hasMany(trilhaProfe, {
                                    //     foreignKey: "userId",
                                    // })
                                    // trilhaProfe.belongsTo(User, {
                                    //     foreignKey: "userId",
                                    // })
                                    // trilhaProfe.hasMany(planoEstudoProfe, {
                                    //     foreignKey: "trilhaProfeId",
                                    // })
                                    // planoEstudoProfe.belongsTo(trilhaProfe, {
                                    //     foreignKey: "trilhaProfeId",
                                    // })
                                    // historicoAvaliacaoProfe.belongsTo(trilhaProfe, {
                                    //     foreignKey: "trilhaProfeId",
                                    // })
                                    // trilhaProfe;hasMany(historicoAvaliacaoProfe, {
                                    //     foreignKey: "trilhaProfeId"
                                    // })
                                    // User.hasMany(historicoChatProfe, {
                                    //      foreignKey: "userId"})
                                    // historicoChatProfe.belognsTo(User, {
                                    //      foreignKey: "userId"})

                //export {user, trilhaProfe, planoEstudoProfe, historicoAvaliacaoProfe, historicoChatProfe}

// 1. Relação Usuário <-> Cursos (Matrícula)
User.belongsToMany(Curso, { through: Matricula, foreignKey: 'userId' });
Curso.belongsToMany(User, { through: Matricula, foreignKey: 'cursoId' });

// 2. Relação Curso <-> Aulas
Curso.hasMany(Aula, { foreignKey: 'cursoId', onDelete: 'CASCADE' });
Aula.belongsTo(Curso, { foreignKey: 'cursoId' });

// 3. Relação Usuário <-> Trilhas da IA
User.hasMany(Trilha, { foreignKey: 'userId', onDelete: 'CASCADE' });
Trilha.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Avaliacao, { foreignKey: 'userId', onDelete: 'CASCADE' });
Avaliacao.belongsTo(User, { foreignKey: 'userId' });

// Exporta tudo centralizado para o resto do servidor usar
export { User, Curso, Matricula, Aula, Trilha, Avaliacao, Questao };