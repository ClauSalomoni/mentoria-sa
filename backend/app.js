import 'dotenv/config';
import express from 'express';
import sequelize from './src/database/db.js';
import UserRouter from './src/router/user.router.js';
import AuthRouter from './src/router/auth.router.js';
import { configCors } from './src/config/cors.js';
import { configHelmet} from './src/config/helmet.js';
import { limitadorGlobal } from './src/config/rateLimit.js';
//importar o modelo para garantir o registro do sequelize
import './src/models/user.model.js'


const app = express();
app.use(express.json());
// 1. Segurança de Cabeçalhos (Blindagem)
app.use(configHelmet);
app.use(configCors); // Isso permite que o seu React acesse o Backend
app.use(limitadorGlobal);


//ROTAS
app.use('/user', UserRouter)
app.use('/auth', AuthRouter)


// ****       alterar para MIGRATIONS assim que sai de dev  ****
sequelize.sync({alter: true}).then(() =>{
    app.listen(process.env.API_PORT, () =>{
        console.log(`Servidor rodando em: http://localhost:${process.env.API_PORT}`)
    });
}).catch(err => console.log("Erro ao montar a API: ", err));
