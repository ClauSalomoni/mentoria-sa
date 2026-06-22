import { Router } from "express";
import * as avaliacaoCtrl from '../controller/avaliacao.controller.js';
import { autenticarToken } from '../middlewares/auth.middleware.js';
import { validarEnvioRespostas } from '../middlewares/avaliacao.middleware.js';

const AvaliacaoRouter = Router();

// GET /api/avaliacao/questoes?area=javascript -> Puxa o simulado dinâmico
AvaliacaoRouter.get('/questoes', autenticarToken, avaliacaoCtrl.gerarSimulado);

// POST /api/avaliacao/enviar -> Corrige as respostas e salva o histórico
AvaliacaoRouter.post('/enviar', autenticarToken, validarEnvioRespostas, avaliacaoCtrl.processarRespostas);

export default AvaliacaoRouter;