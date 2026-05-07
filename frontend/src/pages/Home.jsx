import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('@App:token');
        localStorage.removeItem('@App:user');
        navigate('/login')
    }
    return (
        <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
            <h1>Bem-vindo ao Mentor IA +</h1>
            <p>Esta é a sua área logada (em construção).</p>
            <Button onClick={() => {
                localStorage.clear();
                window.location.href = '/login';
            }}>Sair</Button>
        </div>
    );
}