//ROTAS PUBLICAS, inicio acesso sem token necessario
import 'dotenv/config'; // ← sempre primeira linha
import { where } from 'sequelize';
import { User} from'../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function createUser(req, res){
    const {nome, email, senha} = req.body;
    try{
        if(!nome || !email || !senha){
            return res.status(403).json({error: "requisição incompleta"})
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
export async function login(req, res){
    const{email, senha} = req.body;
    try{
        if(!email || !senha){
            res.status(403).json({error: "requisição incompleta"})
        }
        const usuarioEncontrado = await User.findOne({where:{email: email}})
        console.log(usuarioEncontrado);
        const compareSenha = await bcrypt.compare(senha, usuarioEncontrado.senha)
        
        if (!compareSenha){
            res.status(400).json({Erro: "Dados invalidos"})
        }  
        const token = jwt.sign(
            { id: usuarioEncontrado.id, email: usuarioEncontrado.email }, //payload dentro token
            process.env.JWT_SECRET,  //chave secreta
            { expiresIn: process.env.JWT_EXPIRES_IN } //tempo de validade
        )
        
        // 4. Retorna o token e os dados básicos do usuário
        return res.status(200).json({
            message: 'Login bem-sucedido!',
            token,
            user: {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            }
        });

    }catch(error){
        res.status(500).json(error);
    }
}