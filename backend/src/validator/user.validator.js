import { z } from "zod";

// Criamos o esquema de validação do Usuário
export const cadastroUsuarioSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Insira um e-mail válido"),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    // Aqui o Zod valida estritamente o RBAC!
    role: z.enum(["aluno", "admin"]).default("aluno") 
});