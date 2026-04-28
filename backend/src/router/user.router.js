import { Router } from "express";
import * as userCtrl from '../controller/user.controller.js'
const UserRouter = Router()

//rotas do User
// app.get('/api/teste', (req, res) => {
//   res.json({ mensagem: "Conexão entre Front e Back funcionando!" });
// });

//GET - puxar todo usuarios
// abaixo é geramente como é feito:
// UserRouter.get('/', middlewareJWT, CheckRole['admin'], rotaFinal)
UserRouter.get('/', userCtrl.getUser)
//GET puxar usuario por id
UserRouter.get('/:id',userCtrl.getUserId)

//Delete - destruir um registro de usuario por id



export default UserRouter;