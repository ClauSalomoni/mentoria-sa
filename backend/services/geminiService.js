import 'dotenv/config';
import { GoogleGenAI} from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

export async function perguntarGeminiP(pergunta){
    const resposta = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: pergunta
    })
    return resposta.text
}

export async function gerarTrilhaIAP(nomeTrilha) {
    const prompt = `Atue como especialista em educação e tecnologia. Crie uma avaliação objetiva de nivelamento para a trilha: ${nomeTrilha}.
    Regras:
    - Gere exatamente 10 questões
    - Deve ter 5 alternativas
    - Apenas 1 alternativa deve ser correta
    - Misture níveis de dificuldade
    - Evite perguntas repetidas
    - Retorne apens JSON.
    - Misture a resposta correta entre as diferentes alternativas
    - Não exiba a resposta para o usuário
    
    Formato:
    {
        "questões:" [
            {
                "pergunta": ""
                "alternativa: [
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
                "correta": "A"
            }
        ],
        
    }`
    const resposta = await ai.models.gerarConteudo({
        model: "gemini-2.5-flash",
        contents: prompt

    })
    return resposta.text
}