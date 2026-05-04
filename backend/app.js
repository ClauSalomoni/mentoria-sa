import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './src/database/db.js';
import UserRouter from './src/router/user.router.js';
import AuthRouter from './src/router/auth.router.js';

//importar o modelo para garantir o registro do sequelize
import './src/models/user.model.js'


const app = express();

app.use(cors({
    origin: '*',//'http://localhost:5173', só para este frontend?
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})); // Isso permite que o seu React acesse o Backend
app.use(express.json());
//chama metodo das rotas
app.use('/user', UserRouter)
app.use('/auth', AuthRouter)

sequelize.sync({alter: true}).then(() =>{
    app.listen(process.env.API_PORT, () =>{
        console.log(`Servidor rodando em: http://localhost:${process.env.API_PORT}`)
    });
}).catch(err => console.log("Erro ao montar a API: ", err));
