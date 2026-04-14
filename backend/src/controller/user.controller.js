import { User} from'../models/user.model.js';
import bcrypt from 'bcryptjs';

export async function getUser(req, res){
    try{
        //puxando todos usuarios da tabel User
        const allUser = await User.findAll();
        res.status(201).json(allUser);
        
    } catch(error){
        res.status(500).json(error);
    }
}

export async function getUserId(req, res){
    const id = req.params.id;
    console.log("tendando buscar por id", id);
    
    try{
        //puxando da tabela DB User pelo id/Primary Key
        const resUserId = await User.findByPk(id);
        res.status(201).json(resUserId);

    } catch (error){
        res.status(500).json(error);
    }
}

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