import rateLimit from 'express-rate-limit';

//configurando *******  LIMITES GLOBAIS   *******   :

export const limitadorGlobal = rateLimit({
    //janela de TEMPO de cada IP em milisec
    windowMs: 15*60*1000, //janela de 15 minutos
    max: 200, //Limite de requisições por IP dentro da janela
    message: {
        erro: "Voce foi bloqueado Requisição bloqueada!!:)"
    }, 
    statusCode: 429,
    standardHeaders: true, ///envia dentro do headers rateLimit, tempo, tentativas, e qto falta
    legacyHeaders: false, ///desativa ou 'limpa' headers enviados
});

// Estudar sobre o keyGenerator que 'esquce' IP e foca no id do user!
// keyGenerator: (req) => {
//     // Bloqueia tentativas excessivas para o MESMO e-mail,
//     // mesmo que o hacker mude de IP ou use uma VPN!
//     return req.body.email || req.ip;
//   },


// **** LIMITES por   ROTAS ****

export const limitadorLocal = rateLimit({
    //janela de TEMPO de cada IP em milisec
    windowMs: 10*60*1000, //janela de 10 minutos
    max: 10, //Limite de requisições por IP dentro da janela
    message: {
        erro: "Voce foi bloqueado Requisição bloqueada!!:)"
    }, 
    statusCode: 429,
    standardHeaders: true, ///envia dentro do headers rateLimit, tempo, tentativas, e qto falta
    legacyHeaders: false, ///desativa ou 'limpa' headers enviados
});
//para usar colocamos limitadorLocal apos rota, DEVE SER o PRIMEIRO, para validar limites, e seguir ou bloquear.
//por exemplo:  UserRouter.get('/perfil', limitadosLocal, autenticarToken, userCtrl.perfil)  