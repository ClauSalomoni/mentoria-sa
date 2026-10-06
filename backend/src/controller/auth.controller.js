//ROTAS PUBLICAS, inicio acesso sem token necessario
import 'dotenv/config'; 
import { cadastroUsuarioSchema } from "../validator/user.validator.js";
import { User} from'../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod'; //

export async function createUser(req, res){
    
    try{
        // O Zod intercepta e valida os dados do body
        const dadosValidados = cadastroUsuarioSchema.parse(req.body);
        const {nome, email, senha} = dadosValidados
        
        if(!nome || !email || !senha){
            return res.status(403).json({message: "requisição incompleta"})
        }
        const senha_hash = await bcrypt.hash(senha, 10)
        const resCreateUser = await User.create({
            nome: nome,
            email: email, 
            senha: senha_hash,
          
    });
    const userJson = resCreateUser.toJSON()
    delete userJson.senha
        res.status(201).json({message: "Usuario criado com sucesso", resCreateUser: userJson})
    } catch (error) {
        // 🚀 CORREÇÃO DO BUG: Nova checagem segura para erros do Zod
        if (error instanceof z.ZodError || error.name === "ZodError") {
            return res.status(400).json({ 
                message: "Erro de validação nos dados enviados", 
                // Usamos o 'error.issues' que é o padrão oficial do Zod para listar erros
                detalhes: error.issues?.map(err => `${err.path[0]}: ${err.message}`).join(', ') || "Dados inválidos"
            });
        }

        // Se o erro for do Sequelize (ex: E-mail duplicado)
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ message: "Este e-mail já está cadastrado!" });
        }
        
        console.error("❌ Erro interno no servidor:", error);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
}
export async function login(req, res){
    
    const{email, senha} = req.body;
    try{
        if(!email || !senha){
            return res.status(400).json({message: "requisição incompleta"})
        }
        const usuarioEncontrado = await User.findOne({where:{email: email}})
        
        if (!usuarioEncontrado){
            return res.status(401).json({message: "Dados Inválidos"})
        };
        
        if (usuarioEncontrado.ativo === false) {
            return res.status(403).json({ message: "Conta desativada. Entre em contato com o suporte." });
        }

        const compareSenha = await bcrypt.compare(senha, usuarioEncontrado.senha)
                
        if (!compareSenha){
            return res.status(401).json({message: "Dados invalidos"})
        }  
        const token = jwt.sign(
            { id: usuarioEncontrado.id, email: usuarioEncontrado.email, role: usuarioEncontrado.role }, //payload dentro token
            process.env.JWT_SECRET,  
            { expiresIn: process.env.JWT_EXPIRES_IN } //tempo de validade
        )
        
        // 4. Retorna o token e os dados básicos do usuário
        return res.status(200).json({
            message: 'Login bem-sucedido!',
            token,
            user: {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                role: usuarioEncontrado.role
            }
        });

    }catch(error){
        console.error("Erro interno no servidor: ", error)
        return res.status(500).json({message: "Erro interno no servidor"});
    }
}