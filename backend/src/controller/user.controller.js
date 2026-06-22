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
            return res.status(404).json({message: "Usuário não encontrado"})
        }
        return res.json(user)

    }catch(error){
        return res.status(500).json({message: "Erro ao buscar perfil"})
    }
}

//PUT/user/perfil
export async function atualizarPerfil(req, res) {
    try{
        const {nome, email, senha, avatar} = req.body;
        const user = await User.findByPk(req.user.id)
    
    if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Atualiza campos básicos
        if (nome) user.nome = nome;
        if (email) user.email = email;
        if (avatar) user.avatar = avatar;

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
        return res.status(500).json({ message: "Erro ao atualizar perfil", detalhes: error.message  });
    }
    
}
    
// DELETE /usuario/conta (Soft Delete)
export async function desativarConta(req, res) {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Soft delete: apenas desativa
        //para deletar  const deletarUser = await user.destroy()
        
        
        
        user.ativo = false;
        await user.save();

        // 204 No Content: sucesso, mas sem corpo na resposta
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Erro ao desativar conta" });
    }
};

