import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/Card";
import Button from "../components/Button";
import api from "../services/api";
import "./PerfilTrilha.css";

export default function EditarPerfil() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSalvarPerfil = async (dados) => {
        console.log("Salvando dados pessoais no Postgres...", dados);
        
        setLoading(true);
        try {
            const token = localStorage.getItem('@App:token');
            const response = await api.put('user/perfil', dados,{
                headers: {
                    Authorization: `Bearer ${token}`},

            })

            if(response.status === 200){
                        // 🚀 BOA PRÁTICA: Desestrutura a resposta perfeita que seu NOVO controller envia
                const { token: novoToken, user: usuarioAtualizado } = response.data;

                // Salva diretamente o que veio do servidor, sem remendos
                localStorage.setItem('@App:token', novoToken);
                localStorage.setItem('@App:user', JSON.stringify(usuarioAtualizado));

                alert("Perfil atualizado com sucesso!");
                navigate("/home"); 
            } else{
                alert("Comportamento inesperado ao salvar edição de Perfil")
            }
        } catch (error){
            console.error("Erro ao atualizar perfil:", error);
            
            // Pega a mensagem vinda do seu backend, se houver
            const mensagemErro = error.response?.data?.message || "Erro interno no servidor.";
            alert(`Falha ao atualizar: ${mensagemErro}`);
            
        } finally {
            // Executa sempre, limpando o estado de carregamento
            setLoading(false);

        }
    };

    return (
        <div className="home-layout">
            <Sidebar paginaAtiva="perfil" />
            <div className="main-content">
                <Header onLogout={() => { localStorage.clear(); navigate("/login"); }} showBackButton={true}/>
                
                <main className="dashboard-body">
                    <section className="welcome-area">
                        <h1>Editar Cadastro</h1>
                        <p>{loading ? "Salvando alterações..." : "Mantenha suas informações de acesso atualizadas no sistema."}</p>
                    </section>

                    <div className="dashboard-split-container">
                        <section className="profile-form-section">
                            <ProfileCard 
                            mode="perfil" 
                            onBackOrCancel={() => navigate(-1)} 
                            onSave={handleSalvarPerfil}
                            loading={loading}
                             />
                        </section>

                        {/* <section className="ai-column">
                            <div className="card-cta-ai glass-effect">
                                <div className="ai-badge">CHAT</div>
                                <h3>Fale com a MentorIA</h3>
                                <p>Tem alguma dúvida sobre os seus conteúdos ou quer gerar um simulado personalizado agora?</p>
                                <div className="ai-features">
                                    <span>✦ Resumos Rápidos</span>
                                    <span>✦ Tira-dúvidas 24/7</span>
                                </div>
                                <Button onClick={() => navigate("/mentoria")}>Iniciar Mentoria por IA</Button>
                            </div>
                        </section> */}
                    </div>
                </main>
            </div>
        </div>
    );
}