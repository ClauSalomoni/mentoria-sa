import cors from 'cors';

// Permite tanto o seu site na Vercel quanto os seus testes no PC local
const allowedOrigins = [
    process.env.ORIGIN_CORS,
    'http://localhost:5173',
    'http://localhost:3000'
];

export const configCors = cors({
    origin: function (origin, callback) {
        // Permite requisições sem origem (como ferramentas de teste ou mobile)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || origin === process.env.ORIGIN_CORS) {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado pelo CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Adicionado OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200 // Resolve o problema do Preflight de navegadores antigos/específicos
});
