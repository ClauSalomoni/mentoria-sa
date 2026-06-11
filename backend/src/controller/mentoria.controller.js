import 'dotenv/config';
import { OpenAI } from "openai"; 

// 🚀 Deixamos apenas UMA instância configurada apontando para o OpenRouter
const ai = new OpenAI({
    apiKey: process.env.GROK_API_KEY, // Nome da variável que você salvou no .env
    baseURL: "https://openrouter.ai/api/v1", // URL correta para o OpenRouter fazer a ponte
});

export async function conversarComMentor(req, res) {
    const { mensagem } = req.body;

    if (!mensagem) {
        return res.status(400).json({ message: "A mensagem está vazia." });
    }

    try {
        // 🚀 Corrigido para "ai.chat.completions.create" combinando com a nossa variável acima
        const response = await ai.chat.completions.create({
            model: "google/gemini-2.5-flash", // 🚀 Nome correto do modelo dentro do OpenRouter
            max_tokens: 1000,
            messages: [
                { 
                    role: "system", 
                    content: "Você é o MentorIA, um assistente sarcástico e bem-humorado, mas genial em programação. Ajude o aluno dando exemplos práticos de código." 
                },
                { 
                    role: "user", 
                    content: mensagem 
                },
            ],
        });

        // A estrutura de resposta mapeada com sucesso
        const respostaDoGrok = response.choices[0].message.content;

        return res.status(200).json({ resposta: respostaDoGrok });

    } catch (error) {
        console.error("❌ Erro ao chamar a API do Grok via OpenRouter:", error);
        return res.status(500).json({ message: "O Mentor Grok falhou ao responder. Tente novamente!" });
    }
}