import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button"; 
import "./Home.css";
import Sidebar from "../components/Sidebar";

export default function Home() {
    const [cursos, setCursos] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
       
        const token = localStorage.getItem('@App:token');
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

        if (!token) {
            console.warn("🚨 Token não encontrado, redirecionando para o login.");
            navigate('/login');
            return;
        }

        fetch(`${API_URL}/cursos`, { 
            method: "GET",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                localStorage.clear();
                navigate('/login');
                throw new Error("Sessão expirada");
            }
            return res.json();
        })
        .then(dados => {
            setCursos(dados);
        })
        .catch(err => console.error("❌ Erro no fetch da Home:", err));
    }, [navigate]);

    const handleAcessarCurso = (cursoId) => {
        navigate(`/curso/${cursoId}`);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="home-layout">
            <Sidebar paginaAtiva="inicio" />
            
            <div className="main-content">
                <Header onLogout={handleLogout} />
                
                <main className="dashboard-body">
                    <section className="welcome-area">
                        <h1>Área do Aluno</h1>
                            <div className="dashboard-split-container">
                                <Button className="btn-criar-nova" onClick={() => navigate("/criar-trilha")}>
                                    + Criar Trilha
                                </Button>
                            </div>
                        
                        
                    </section>

                    <div className="dashboard-split-container">
                        <section className="study-column">
                            <div className="list-container">
                                {cursos.length === 0 ? (
                                    <p style={{ color: "#fff", padding: "20px" }}>Nenhum curso disponível no momento.</p>
                                ) : (
                                    cursos.map((curso) => (
                                        <div key={curso.id} className="item-estudo glass-effect" style={{ borderLeftColor: curso.cor }}>
                                            <div className="item-info">
                                                <h4>{curso.titulo}</h4>
                                                <p>Progresso: 0%</p>
                                                <div className="progress-bar-bg">
                                                    <div 
                                                        className="progress-bar-fill" 
                                                        style={{ 
                                                            width: "0%", 
                                                            backgroundColor: curso.cor 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="item-action">
                                                <Button onClick={() => handleAcessarCurso(curso.id)}>
                                                    Assistir
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>

                        <section className="ai-column">
                            <div className="card-cta-ai glass-effect">
                                <div className="ai-badge">CHAT</div>
                                <h3>Fale com a MentorIA</h3>
                                <p>Tem alguma dúvida sobre as suas trilhas ou os seus conteúdos? Inicie uma mentoria com IA agora.</p>
                                <div className="ai-features">
                                    <span>✦ Resumos Rápidos</span>
                                    <span>✦ Tira-dúvidas 24/7</span>
                                </div>
                                <Button onClick={() => navigate('/mentoria')}>
                                    Iniciar Mentoria por IA
                                </Button>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
