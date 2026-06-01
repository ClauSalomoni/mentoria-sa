import { Router } from "express";
import * as DashCtrl from "../controller/dashboard.controller.js";
import { criarAula } from "../controller/aula.controller.js";
import { autenticarToken } from "../middleware/auth.middleware.js";
import { concederAcesso } from "../middleware/rbac.middleware.js"; // Novo middleware

const DashboardRouter = Router();

// ROTA DE LEITURA: Tanto aluno quanto admin podem acessar
DashboardRouter.get("/cursos", autenticarToken, DashCtrl.listarCursos);
DashboardRouter.get("/curso/:cursoId", autenticarToken, DashCtrl.buscarDetalhesDoCurso);

// Puxa a lista de vídeos/aulas para o player do React carregar
DashboardRouter.get("/curso/:cursoId/aulas", autenticarToken, DashCtrl.buscarAulasDoCurso);

// Rota para o aluno se inscrever em um curso do catálogo
DashboardRouter.post("/matricular", autenticarToken, DashCtrl.matricularEmCurso);
// ROTA DE ESCRITA: APENAS quem for 'admin' passa pelo segundo filtro
DashboardRouter.post("/aula", autenticarToken, concederAcesso("admin"), criarAula);

export default DashboardRouter;