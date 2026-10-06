import jwt from 'jsonwebtoken';

export function autenticarToken(req, res, next) {
    // 1. Pega o cabeçalho 'Authorization'
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensagem: "Acesso negado: formato de token inválido" });
    }

    // Extraímos o token ignorando o prefixo "Bearer "
    const token = authHeader.split(' ')[1];
        

    try {
            
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
                
        req.user = decoded;
        
        //abaixo o express esta passando o req com token para o resto do ciclo da requisição
        return next();
    } catch (err) {
        // Captura tanto token expirado quanto assinatura inválida
        return res.status(401).json({ mensagem: "Token inválido ou expirado", erro: err });
    }
}