import 'dotenv/config';
import express from 'express';
import sequelize from './src/database/db.js';
import UserRouter from './src/router/user.router.js';
import AuthRouter from './src/router/auth.router.js';
import TrilhaRouter from './src/router/trilha.router.js'
import { configCors } from './src/config/cors.js';
import { configHelmet} from './src/config/helmet.js';
import { limitadorGlobal } from './src/config/rateLimit.js';
import MentoriaRouter from './src/router/mentoria.router.js';
import './src/models/user.model.js'
import './src/models/index.js'
import DashboardRouter from './src/router/dashboardAulas.router.js';


const app = express();
app.use(configCors);

// 1. Segurança de Cabeçalhos (Blindagem)
app.use(configHelmet);
 // Isso permite que o seu React acesse o Backend
app.use(limitadorGlobal);
app.use(express.json());

//ROTAS
app.use('/', DashboardRouter)

app.use('/user', UserRouter)
app.use('/auth', AuthRouter)
app.use("/mentoria", MentoriaRouter);
app.use('/trilhas', TrilhaRouter)
app.use('/minhas-trilhas', TrilhaRouter)


const PORT_TO_LISTEN = process.env.PORT || process.env.API_PORT || 3333;

sequelize.sync({ alter: false }).then(() => {
    app.listen(PORT_TO_LISTEN, '0.0.0.0', () => {
        console.log(`Servidor rodando com sucesso na porta: ${PORT_TO_LISTEN}`);
    });
}).catch(err => {
    console.error("Erro crítico ao conectar no banco/montar a API: ", err);
});
