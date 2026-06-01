import { criarAulaSchema } from "../validators/curso.validator.js";
import { Aula } from "../models/aula.model.js";
import { z } from "zod";

export async function criarAula(req, res) {
    try {
        // O Zod tenta ler e validar os dados que vieram do Front
        const dadosValidados = criarAulaSchema.parse(req.body);
        
        // Se o código passar daqui, significa que os dados estão 100% perfeitos!
        const { titulo, ordem, videoUrl, materialUrl, descricao, cursoId } = dadosValidados;
        const novaAula = await Aula.create(dadosValidados);

        return res.status(201).json({ message: "Aula adicionada com sucesso!", novaAula });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ 
                message: "Dados inválidos enviados para o servidor.", 
                // MAPEIA O ERRO: Devolve uma lista limpa com o nome do campo e a mensagem de erro
                erros: error.errors.map(err => ({
                    campo: err.path[0],
                    mensagem: err.message
                }))
            });
        }
        return res.status(500).json({ message: "Erro ao adicionar aula", detalhes: error.message });
    }
}