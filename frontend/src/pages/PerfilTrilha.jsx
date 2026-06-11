import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/Card";
import Button from "../components/Button";
import "./PerfilTrilha.css";

export default function PerfilTrilha() {
    const navigate = useNavigate();

    const handleSalvarTrilha = (dados) => {
        console.log("Salvando trilha no Postgres...", dados);
        alert("Trilha atualizada!");
        navigate("/");
    };

    return (
        <div className="home-layout">
            <Sidebar paginaAtiva="trilha" />
            <div className="main-content">
                <Header onLogout={() => { localStorage.clear(); navigate("/login"); }} showBackButton={true} />
                
                <main className="dashboard-body">
                    <section className="welcome-area">
                        <h1>Minha Trilha</h1>
                        
                    </section>

                    <div className="dashboard-split-container">
                        <section className="profile-form-section">
                            <ProfileCard mode="trilha" onBackOrCancel={() => navigate(-1)} onSave={handleSalvarTrilha} />
                        </section>

                        <section className="ai-column">
                            <div className="card-cta-ai glass-effect">
                                <div className="ai-badge">NOVO</div>
                                <h3>Fale com a MentorIA</h3>
                                <p>Tem alguma dúvida sobre os seus conteúdos ou quer gerar um simulado personalizado agora?</p>
                                <div className="ai-features">
                                    <span>✦ Resumos Rápidos</span>
                                    <span>✦ Tira-dúvidas 24/7</span>
                                </div>
                                <Button onClick={() => navigate("/mentoria")}>Iniciar Mentoria por IA</Button>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}