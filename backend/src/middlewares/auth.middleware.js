import jwt from 'jsonwebtoken';

export function autenticarToken(req, res, next) {
    // 1. Pega o cabeçalho 'Authorization'
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensagem: "Acesso negado: formato de token inválido" });
    }

    // Extraímos o token ignorando o prefixo "Bearer "
    const token = authHeader.split(' ')[1];
    console.log(token);
    

    try {
        // Melhoria 3: Uso do Verify sem callback (lança exceção se der erro)
        console.log(process.env.JWT_SECRET);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        
        // Melhoria 4: Nomeclatura padrão de mercado
        req.user = decoded;
        //export async function listarMeusPedidos(req, res) {
            console.log(req.user);
    //     const usuarioId = req.user.id; // O ID veio do token  decodificado!
    // ... busca no banco apenas os pedidos desse ID
//}

        //abaixo o express esta passando o req com token para o resto do ciclo da requisição
        return next();
    } catch (err) {
        // Captura tanto token expirado quanto assinatura inválida
        return res.status(401).json({ mensagem: "Token inválido ou expirado", erro: err });
    }
}