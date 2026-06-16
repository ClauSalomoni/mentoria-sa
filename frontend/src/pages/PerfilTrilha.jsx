import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/Card";
import Button from "../components/Button";
import api from "../services/api";
import "./PerfilTrilha.css";

export default function PerfilTrilha() {
    const navigate = useNavigate();

    // Envia as escolhas do aluno + conteúdo do banco para o Postgres
    const handleSalvarTrilha = async (dadosCard) => {
        try {
            console.log("Salvando trilha no Postgres...", dadosCard);
            const token = localStorage.getItem('@App:token');

            // Aqui você monta o objeto esperado pelo seu back-end
            const payload = {
                area: dadosCard.area,
                nivel: dadosCard.nivel,
                // conteudo_ia: ... se você já tiver o estado da IA carregado aqui
            };

            // Chamada real HTTP POST para salvar no banco de dados
            await api.post('/trilhas/salvar', payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Trilha criada e atualizada com sucesso!");
            navigate("/home"); // Redireciona explicitamente para a Home protegida

        } catch (error) {
            console.error("Erro ao persistir trilha:", error);
            alert("Houve um erro ao salvar sua trilha no servidor.");
        }
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
                            <ProfileCard mode="trilha" onBackOrCancel={() => navigate("/home")} onSave={handleSalvarTrilha} />
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