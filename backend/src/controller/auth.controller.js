//ROTAS PUBLICAS, inicio acesso sem token necessario
import 'dotenv/config'; // ← sempre primeira linha
//import { where } from 'sequelize';
import { cadastroUsuarioSchema } from "../validator/user.validator.js";
import { User} from'../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function createUser(req, res){
    // console.log("--> ENTRANDO NA FUNÇÃO CREATEUSER");
    // console.log("--> DADOS RECEBIDOS:", req.body);
    try{
        // O Zod intercepta e valida os dados do body
        const dadosValidados = cadastroUsuarioSchema.parse(req.body);
        const {nome, email, senha} = dadosValidados
        console.log("Dados extraídos com sucesso:", { nome, email });
        if(!nome || !email || !senha){
            return res.status(403).json({message: "requisição incompleta"})
        }
        const senha_hash = await bcrypt.hash(senha, 10)
        const resCreateUser = await User.create({
            nome: nome,
            email: email, 
            senha: senha_hash,
            role

    });
    const userJson = resCreateUser.toJSON()
    delete userJson.senha
        res.status(201).json({message: "Usuario criado com sucesso", resCreateUser: userJson})
    } catch(error){
        // Se o erro for do Zod, nós tratamos e devolvemos os detalhes amigáveis para o Front
        if (error instanceof z.ZodError) {
            return res.status(400).json({ 
                message: "Erro de validação nos dados enviados", 
                erros: error.errors.map(err => ({ campo: err.path[0], mensagem: err.message }))
            });
        }
        //console.log("--- ERRO CAPTURADO ---");
        //console.error(error); // Agora sim ele vai aparecer no terminal!
        return res.status(500).json({ message: "Erro interno", detalhes: error.message });
    }
}
export async function login(req, res){
    const{email, senha} = req.body;
    try{
        if(!email || !senha){
            return res.status(400).json({message: "requisição incompleta"})
        }
        const usuarioEncontrado = await User.findOne({where:{email: email}})
        console.log("--> USUÁRIO ENCONTRADO NO BANCO:", usuarioEncontrado ? "SIM" : "NÃO");

        if (!usuarioEncontrado){
            return res.status(401).json({message: "Dados Inválidos"})
        };
        
        if (usuarioEncontrado.ativo === false) {
            return res.status(403).json({ message: "Conta desativada. Entre em contato com o suporte." });
        }

        const compareSenha = await bcrypt.compare(senha, usuarioEncontrado.senha)
        console.log("--> A SENHA COINCIDE?:", compareSenha);
        
        if (!compareSenha){
            return res.status(401).json({message: "Dados invalidos"})
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
                email: usuarioEncontrado.email,
                role: usuarioEncontrado.role
            }
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Erro interno no servidor"});
    }
}