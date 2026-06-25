// ABAIXO codigo antigo ainda não testado nem integrado

// import { Curso } from "../models/curso.model.js";
// import { Matricula } from "../models/matricula.model.js";
// import { Aula } from "../models/aula.model.js";

// // 1. Listar TODOS os cursos existentes para o aluno escolher
// export async function listarCursos(req, res) {
//     try {
//         const cursos = await Curso.findAll();
//         return res.status(200).json(cursos);
//     } catch (error) {
//         return res.status(500).json({ message: "Erro ao carregar catálogo", erro: error.message });
//     }
// }

// // 2. Matricular o aluno logado em um curso escolhido
// export async function matricularEmCurso(req, res) {
//     try {
//         const userId = req.user.id; // Pego direto do Token JWT verificado
//         const { cursoId } = req.body;

//         // Verifica se já está matriculado
//         const jaMatriculado = await Matricula.findOne({ where: { userId, cursoId } });
//         if (jaMatriculado) {
//             return res.status(400).json({ message: "Você já está inscrito neste curso." });
//         }

//         const novaMatricula = await Matricula.create({ userId, cursoId, progresso: 0 });
//         return res.status(201).json({ message: "Inscrição realizada com sucesso!", novaMatricula });
//     } catch (error) {
//         return res.status(500).json({ message: "Erro ao se matricular", erro: error.message });
//     }
// }
//     export async function buscarDetalhesDoCurso(req, res) {
//     try {
//         const { cursoId } = req.params;
//         const curso = await Curso.findByPk(cursoId);

//         if (!curso) {
//             return res.status(404).json({ message: "Curso não encontrado." });
//         }

//         return res.status(200).json(curso);
//     } catch (error) {
//         return res.status(500).json({ message: "Erro ao buscar detalhes do curso", erro: error.message });
//     }
// }

// // 4. NOVA FUNÇÃO: Busca a playlist de aulas daquele curso ordenadas pela coluna 'ordem'
// export async function buscarAulasDoCurso(req, res) {
//     try {
//         const { cursoId } = req.params;

//         const aulas = await Aula.findAll({
//             where: { cursoId },
//             order: [['ordem', 'ASC']] // Garante que a aula 1 venha antes da aula 2 no React
//         });

//         return res.status(200).json(aulas);
//     } catch (error) {
//         return res.status(500).json({ message: "Erro ao carregar as aulas do curso", erro: error.message });
//     }

// }