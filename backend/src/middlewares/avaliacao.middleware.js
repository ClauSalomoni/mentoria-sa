export function validarEnvioRespostas(req, res, next) {
    const { area, respostas } = req.body;

    // 1. Valida se a área foi enviada
    if (!area) {
        return res.status(400).json({ message: "O campo 'area' é obrigatório." });
    }

    // 2. Valida se o array de respostas existe e é realmente um Array
    if (!respostas || !Array.isArray(respostas)) {
        return res.status(400).json({ message: "O campo 'respostas' deve ser um array válido." });
    }

    // 3. Valida a estrutura de cada resposta enviada
    for (const item of respostas) {
        if (item.questaoId === undefined || item.respostaUsuario === undefined) {
            return res.status(400).json({ 
                message: "Cada item do array de respostas deve conter 'questaoId' e 'respostaUsuario'." 
            });
        }
        
        // Garante que a resposta seja um número entre 0 e 4 (já que são 5 alternativas)
        if (item.respostaUsuario < 0 || item.respostaUsuario > 4) {
            return res.status(400).json({ 
                message: "A 'respostaUsuario' deve ser um número entre 0 e 4." 
            });
        }
    }

    // Se passou em todas as validações, chama o next() para ir para o Controller!
    next();
}