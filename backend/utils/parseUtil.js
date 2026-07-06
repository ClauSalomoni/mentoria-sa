
/**
 * Limpa marcações Markdown de uma string retornada por uma IA e faz o parse para JSON.
 * @param {string} respostaIA - String bruta retornada pelo modelo de linguagem.
 * @returns {Object} Objeto JSON parseado.
 */
export function parseRespostaIA(respostaIA) {
  if (!respostaIA || typeof respostaIA !== 'string') {
    throw new Error("A resposta da IA está vazia ou não é uma string válida.");
  }

  const jsonLimpo = respostaIA
    .replace(/```json/gi, '') // Remove o início do bloco markdown de json
    .replace(/```/g, '')      // Remove o fechamento do bloco markdown
    .trim();                  // Remove espaços/quebras de linha inúteis

  return JSON.parse(jsonLimpo);
}