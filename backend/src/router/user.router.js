import { Router } from "express";
import * as userCtrl from '../controller/user.controller.js'
import { autenticarToken} from '../middlewares/auth.middleware.js'
const UserRouter = Router()

//rotas do User
// app.get('/api/teste', (req, res) => {
//   res.json({ mensagem: "Conexão entre Front e Back funcionando!" });
// });

//GET - puxar todo usuarios
// abaixo é geramente como é feito:
// UserRouter.get('/', middlewareJWT, CheckRole['admin'], rotaFinal)

//Delete - destruir um registro de usuario por id

UserRouter.get('/perfil', autenticarToken, userCtrl.perfil)
UserRouter.put('/perfil', autenticarToken, userCtrl.atualizarPerfil)
UserRouter.delete('/perfil', autenticarToken, userCtrl.desativarConta)

export default UserRouter;