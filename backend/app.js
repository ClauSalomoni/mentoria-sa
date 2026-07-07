import 'dotenv/config';
import express from 'express';
import sequelize from './src/database/db.js';
import UserRouter from './src/router/user.router.js';
import AuthRouter from './src/router/auth.router.js';
//import DashboardRouter from './src/router/dashboardAulas.router.js';
import TrilhaRouter from './src/router/trilha.router.js'
import { configCors } from './src/config/cors.js';
import { configHelmet} from './src/config/helmet.js';
import { limitadorGlobal } from './src/config/rateLimit.js';
import MentoriaRouter from './src/router/mentoria.router.js';
//import AvaliacaoRouter from './src/router/avaliacao.router.js';
//importar o modelo para garantir o registro do sequelize
import './src/models/user.model.js'
import './src/models/index.js'
import DashboardRouter from './src/router/dashboardAulas.router.js';


const app = express();
app.use(configCors);

// 1. Segurança de Cabeçalhos (Blindagem)
//app.use(configHelmet);
 // Isso permite que o seu React acesse o Backend
//app.use(limitadorGlobal);
app.use(express.json());

//ROTAS
app.use('/', DashboardRouter)

app.use('/user', UserRouter)
app.use('/auth', AuthRouter)
//app.use('/', DashboardRouter);
app.use("/mentoria", MentoriaRouter);
app.use('/trilhas', TrilhaRouter)
app.use('/minhas-trilhas', TrilhaRouter)

// 🚀 2. Registrar o prefixo da rota de simulados e avaliações
// Ex de chamadas no Front: fetch('/avaliacao/questoes') ou fetch('/avaliacao/enviar')

//app.use('/avaliacao', AvaliacaoRouter);

// ****       alterar para MIGRATIONS assim que sai de dev  ****
sequelize.sync({alter: true}).then(() =>{
    app.listen(process.env.API_PORT, () =>{
        console.log(`Servidor rodando em: http://localhost:${process.env.API_PORT}`)
    });
}).catch(err => console.log("Erro ao montar a API: ", err));
