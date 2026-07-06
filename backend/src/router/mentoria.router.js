import { Router } from "express";
import { perguntarChat, obterHistoricoChat} from '../controller/chat.controller.js'

import { autenticarToken } from "../middlewares/auth.middleware.js"; // Seu middleware de token

const MentoriaRouter = Router();

// Rota protegida: O aluno precisa estar logado para falar com a IA
MentoriaRouter.post("/chat", autenticarToken, perguntarChat);
MentoriaRouter.get("/historico", autenticarToken, obterHistoricoChat);


export default MentoriaRouter;