import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './src/database/db.js';
import UserRouter from './src/router/user.router.js';
import AuthRouter from './src/router/auth.router.js';
import { configCors } from './src/config/cors.js';
import { configHelmet} from './src/config/helmet.js';
import helmet from 'helmet'
//importar o modelo para garantir o registro do sequelize
import './src/models/user.model.js'


app.use(helmet(configHelmet));
app.use(cors(configCors)); // Isso permite que o seu React acesse o Backend
// 1. Segurança de Cabeçalhos (Blindagem)
const app = express();


app.use(express.json());
//ROTAS
app.use('/user', UserRouter)
app.use('/auth', AuthRouter)

sequelize.sync({alter: true}).then(() =>{
    app.listen(process.env.API_PORT, () =>{
        console.log(`Servidor rodando em: http://localhost:${process.env.API_PORT}`)
    });
}).catch(err => console.log("Erro ao montar a API: ", err));
