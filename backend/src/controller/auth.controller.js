import { User} from'../models/user.model.js';
import bcrypt from 'bcryptjs';

export async function createUser(req, res){
    const {nome, email, senha} = req.body;
    try{
        if(!nome || !email || !senha){
            res.status(403).json({error: "requisição incompleta"})
        }
        const senha_hash = await bcrypt.hash(senha, 10)
        const resCreateUser = await User.create({
            nome: nome,
            email: email, 
            senha: senha_hash
    });
    const userJson = resCreateUser.toJSON()
    delete userJson.senha
        res.status(200).json({mensagem: "Usuario criado com sucesso", resCreateUser: userJson})
    } catch(error){
        res.status(500).json(error);
    }
}