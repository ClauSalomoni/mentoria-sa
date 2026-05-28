import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button"; 
import "./Home.css";

// Caminho fictício da logo - altere para o caminho real da sua imagem (.png, .jpg ou .svg)
import robo from "../assets/robo.jpg"; 

export default function Home() {
    const cursosSugestoes = [
        { id: 1, titulo: "Python para Dados", progresso: "80%", cor: "#8b0000" },
        { id: 2, titulo: "Power BI Avançado", progresso: "45%", cor: "#2d5a27" },
        { id: 3, titulo: "SQL Queries Expert", progresso: "10%", cor: "#003366" },
        { id: 4, titulo: "Estatística Básica", progresso: "0%", cor: "#555" }
    ];
    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="home-layout">
            
            {/* SIDEBAR INTEGRADA COM SEU DESIGN SYSTEM GLASS */}
            <aside className="sidebar">
                <div className="sidebar-logo-area">
                    <img src={robo} alt="Logo" className="sidebar-logo" />
                    <h2 className="sidebar-title">Dashboard</h2>
                </div>
                
                <hr className="sidebar-divider" />
                
                <nav>
                    <ul>
                        <li className="active">Início</li>
                        <li>Meus Cursos</li>
                        <li>Simulados</li>
                        <li>Configurações</li>
                    </ul>
                </nav>
            </aside>
            
            {/* ÁREA DE CONTEÚDO PRINCIPAL */}
            <div className="main-content">
                <Header onLogout={handleLogout} />
                
                <main className="dashboard-body">
                    <section className="welcome-area">
                        <h1>Área do Aluno</h1>
                        <p>Sua trilha de aprendizado adaptada por inteligência artificial.</p>
                    </section>

                    <div className="dashboard-split-container">
                        
                        {/* LISTA DE ESTUDOS */}
                        <section className="study-column">
                            <h3>O que estudar hoje?</h3>
                            <div className="list-container">
                                {cursosSugestoes.map((curso) => (
                                    <div key={curso.id} className="item-estudo glass-effect" style={{ borderLeftColor: curso.cor }}>
                                        <div className="item-info">
                                            <h4>{curso.titulo}</h4>
                                            <p>Progresso: {curso.progresso}</p>
                                            
                                            <div className="progress-bar-bg">
                                                <div 
                                                    className="progress-bar-fill" 
                                                    style={{ width: curso.progresso, backgroundColor: curso.cor }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="item-action">
                                            <button className="btn-acessar">Assistir</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* CARD DA INTELIGÊNCIA ARTIFICIAL */}
                        <section className="ai-column">
                            <div className="card-cta-ai glass-effect">
                                <div className="ai-badge">NOVO</div>
                                <h3>Fale com a MentorIA</h3>
                                <p>Tem alguma dúvida sobre os seus conteúdos ou quer gerar um simulado personalizado agora?</p>
                                
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