import { Router } from "express";
import { perguntarChat} from '../controller/chat.controller.js'
import { autenticarToken } from "../middlewares/auth.middleware.js"; // Seu middleware de token

const MentoriaRouter = Router();

// Rota protegida: O aluno precisa estar logado para falar com a IA
MentoriaRouter.post("/chat", autenticarToken, perguntarChat);


export default MentoriaRouter;