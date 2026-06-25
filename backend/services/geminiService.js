import 'dotenv/config';
import { GoogleGenAI} from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

export async function gerarRespostaGemini(pergunta){
    const resposta = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: pergunta
    })
    return resposta.text
}

