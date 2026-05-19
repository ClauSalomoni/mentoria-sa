import { Router } from "express";
import * as AuthCtrl from '../controller/auth.controller.js'
import { limitadorErrosLogin } from '../config/rateLimit.js';

const AuthRouter = Router()

//Rotas publicas: cadastro e login

//POST - cadastrar user
AuthRouter.post('/cadastro', AuthCtrl.createUser)
//Delete - destruir um registro de usuario por id

AuthRouter.post('/login', limitadorErrosLogin, AuthCtrl.login)

export default AuthRouter;