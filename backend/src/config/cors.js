import cors from 'cors';

export const configCors = cors({
    origin: process.env.ORIGIN_CORS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});

