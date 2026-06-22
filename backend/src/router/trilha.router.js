import { Router } from "express";
import { salvarTrilhaIA, listarTrilhasDoAluno } from "../controller/trilha.controller.js";
import { autenticarToken } from "../middlewares/auth.middleware.js";

const TrilhaRouter = Router()

TrilhaRouter.post("/trilha", autenticarToken, salvarTrilhaIA);
TrilhaRouter.get("/minhas-trilhas", autenticarToken, listarTrilhasDoAluno);

export default TrilhaRouter;