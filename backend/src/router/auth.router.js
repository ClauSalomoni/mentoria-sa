import { Router } from "express";
import * as AuthCtrl from '../controller/auth.controller.js'

const AuthRouter = Router()

//Rotas publicas: cadastro e login

//POST - cadastrar user
AuthRouter.post('/cadastro', AuthCtrl.createUser)
//Delete - destruir um registro de usuario por id

AuthRouter.post('/login', AuthCtrl.login)

export default AuthRouter;