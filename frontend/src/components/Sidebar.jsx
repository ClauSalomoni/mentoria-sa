import { useNavigate } from "react-router-dom";
import robo from "../assets/robo.jpg"; 
import './Sidebar.css'

// Recebemos "paginaAtiva" como propriedade para saber qual item destacar
export default function Sidebar({ paginaAtiva }) {
    const navigate = useNavigate();

    return (
        <aside className="sidebar">
            <div className="sidebar-logo-area">
                <img src={robo} alt="Logo" className="sidebar-logo" />
                <h2 className="sidebar-title">Dashboard</h2>
            </div>
            
            <hr className="sidebar-divider" />
            
            <nav>
                <ul>
                    <li 
                        className={paginaAtiva === "inicio" ? "active" : ""} 
                        onClick={() => navigate("/home")}
                    >
                        Início 
                    </li>
                    <li 
                        className={paginaAtiva === "mentoria" ? "active" : ""} 
                        onClick={() => navigate("/mentoria")}
                    >
                        MentorIA
                    </li>
                    <li className={paginaAtiva === "cursos" ? "active" : ""}>
                        Meus Cursos
                    </li>
                    <li 
                        className={paginaAtiva === "trilha" ? "active" : ""}
                        onClick={() => navigate("/trilha")}
                    >
                        Minhas Trilhas
                    </li>
                    <li 
                        className={paginaAtiva === "perfil" ? "active" : ""}
                        onClick={() => navigate("/perfil")}
                    >
                        Perfil
                    </li>
                </ul>
            </nav>
        </aside>
    );
}