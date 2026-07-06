import { Router } from "express";
import { gerarAvaliacao, 
    responderAvaliacao, 
    listarTrilhas, 
    buscarTrilha, 
    atualizarTrilha, 
    excluirTrilha, 
    criarTrilha,
    obterHistoricoAvaliacoes
} from "../controller/trilha.controller.js";
import { autenticarToken } from "../middlewares/auth.middleware.js";

const TrilhaRouter = Router()

TrilhaRouter.post("/avaliacao", autenticarToken, gerarAvaliacao);
TrilhaRouter.post("/avaliacao/responder", autenticarToken, responderAvaliacao);

TrilhaRouter.get("/avaliacoes/historico", autenticarToken, obterHistoricoAvaliacoes);

TrilhaRouter.post("/", autenticarToken, criarTrilha);
TrilhaRouter.get("/", autenticarToken, listarTrilhas);

TrilhaRouter.get("/:id", autenticarToken, buscarTrilha);
TrilhaRouter.put("/:id", autenticarToken, atualizarTrilha);
TrilhaRouter.delete("/:id", autenticarToken, excluirTrilha);

export default TrilhaRouter;