import axios from 'axios';

const api = axios.create({
    // No Vite, use import.meta.env para variáveis de ambiente
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Interceptor para adicionar o Token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@App:token');
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

export default api;