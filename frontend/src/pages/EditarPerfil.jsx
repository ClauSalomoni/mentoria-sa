import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/Card";
import Button from "../components/Button";
import "./PerfilTrilha.css";

export default function EditarPerfil() {
    const navigate = useNavigate();

    const handleSalvarPerfil = (dados) => {
        console.log("Salvando dados pessoais no Postgres...", dados);
        alert("Perfil atualizado!");
        navigate("/");
    };

    return (
        <div className="home-layout">
            <Sidebar paginaAtiva="perfil" />
            <div className="main-content">
                <Header onLogout={() => { localStorage.clear(); navigate("/login"); }} showBackButton={true}/>
                
                <main className="dashboard-body">
                    <section className="welcome-area">
                        <h1>Editar Cadastro</h1>
                        <p>Mantenha suas informações de acesso atualizadas no sistema.</p>
                    </section>

                    <div className="dashboard-split-container">
                        <section className="profile-form-section">
                            <ProfileCard mode="perfil" onBackOrCancel={() => navigate(-1)} onSave={handleSalvarPerfil} />
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