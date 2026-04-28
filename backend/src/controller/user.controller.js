import { User} from'../models/user.model.js';
import bcrypt from 'bcryptjs';

export async function getUser(req, res){
    try{
        //puxando todos usuarios da tabel User
        const allUser = await User.findAll();
        console.log("\nTipo da variavel: ", typeof(allUser));
        console.log("\nConteudo variavel:", allUser);
        
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

