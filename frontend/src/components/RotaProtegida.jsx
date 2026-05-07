import { Navigate } from 'react-router-dom';

export default function RotaProtegida({ children }) {
    const token = localStorage.getItem('@App:token');

    // Se não tiver token, manda para o login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Se tiver token, deixa passar (renderiza o Dashboard/Mentoria)
    return children;
}