import { z } from "zod";

// Validador para quando alguém for criar um CURSO
export const criarCursoSchema = z.object({
    titulo: z.string({
        required_error: "O título do curso é obrigatório",
        invalid_type_error: "O título deve ser um texto"
    }).min(3, "O título do curso deve ter pelo menos 3 caracteres"),
    
    cor: z.string().regex(/^#[0-9A-F]{6}$/i, "A cor deve ser um código Hexadecimal válido (Ex: #FF0000)").optional()
});

// Validador para quando alguém for criar uma AULA
export const criarAulaSchema = z.object({
    titulo: z.string().min(2, "O título da aula deve ter pelo menos 2 caracteres"),
    ordem: z.number().int().positive("A ordem da aula deve ser um número inteiro positivo"),
    
    // O Zod valida se o link enviado é realmente uma URL real!
    videoUrl: z.string().url("O link do vídeo deve ser uma URL válida (ex: https://...)").includes("/embed/", {
        message: "A URL do vídeo precisa estar no formato de incorporação (/embed/)"
    }),
    
    materialUrl: z.string().url("O link do material de apoio deve ser uma URL válida").nullable().optional(),
    descricao: z.string().max(500, "A descrição não pode passar de 500 caracteres").optional(),
    cursoId: z.number().int().positive("O ID do curso deve ser um número válido")
});