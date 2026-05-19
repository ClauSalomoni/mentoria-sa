import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "./Home.css";

export default function Home() {
    const cursosSugestões = [
  { id: 1, titulo: "Python para Dados", progresso: "80%", cor: "#8b0000" },
  { id: 2, titulo: "Power BI Avançado", progresso: "45%", cor: "#2d5a27" },
  { id: 3, titulo: "SQL Queries Expert", progresso: "10%", cor: "#003366" },
  { id: 4, titulo: "Estatística Básica", progresso: "0%", cor: "#555" }
];
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        // 1. Sem window.location: Usando o hook do React Router
        navigate('/login');
    };

    return (
        <div className="home-layout">
            <Sidebar />
            
            <div className="main-content">
                <Header onLogout={handleLogout} />
                
                <main className="dashboard-body">
                    <section className="welcome-area">
                        <h1>Bem-vindo ao Mentor IA +</h1>
                        <p>Sua trilha de aprendizado personalizada.</p>
                    </section>

                    <section className="study-grid">
                        <h3>O que estudar hoje?</h3>
                        
                        <div className="cards-container">
                            {/* 2. Usando o .map() para gerar os cards dinamicamente */}
                            {cursosSugestões.map((curso) => (
                                <div key={curso.id} className="card-estudo" style={{ borderLeftColor: curso.cor }}>
                                    <h4>{curso.titulo}</h4>
                                    <p>Progresso: {curso.progresso}</p>
                                    <div className="progress-bar-bg">
                                        <div 
                                            className="progress-bar-fill" 
                                            style={{ width: curso.progresso, backgroundColor: curso.cor }}
                                        ></div>
                                    </div>
                                    <button className="btn-acessar">Continuar</button>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}