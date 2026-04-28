//Rotas PRIVADAS!!!
import { User} from'../models/user.model.js';
import bcrypt from 'bcryptjs';

//GET /user/perfil
export async function perfil(req, res) {
    try{
        const user = await User.findByPk(req.user.id, {
            attributes: {exclude: ['senha']}
        })
        if(!user){
            return res.status(404).json({error: "Usuário não encontrado"})
        }
        return res.json(user)

    }catch(error){
        return res.status(500).json({error: "Erro ao buscar perfil"})
    }
}

//PUT/user/perfil
export async function atualizarPerfil(req, res) {
    try{
        const {nome, email, senha} = req.body;
        const user = await User.findByPk(req.user.id)
    
    if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Atualiza campos básicos
        if (nome) user.nome = nome;
        if (email) user.email = email;

        // Se enviou senha, gera novo hash
        if (senha) {
            user.senha = await bcrypt.hash(senha, 10);
        }

        await user.save();

        // Retorna os dados atualizados sem a senha
        const usuarioAtualizado = user.toJSON();
        delete usuarioAtualizado.senha;

        return res.json(usuarioAtualizado);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar perfil" });
    }
    
}
    
// DELETE /usuario/conta (Soft Delete)
export async function desativarConta(req, res) {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Soft delete: apenas desativa
        user.ativo = false;
        await user.save();

        // 204 No Content: sucesso, mas sem corpo na resposta
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Erro ao desativar conta" });
    }
};







export async function getUser(req, res){
    try{
        //puxando todos usuarios da tabel User
        const allUser = await User.findAll();
        console.log("\nTipo da variavel: ", typeof(allUser));
        console.log("\nConteudo variavel:", allUser);
        
        res.status(200).json(allUser);
        
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

