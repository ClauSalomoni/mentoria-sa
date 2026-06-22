import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/Card";
import VerificacaoNivel from "../components/VerificacaoNivel";
import ResultadoSimulado from "../components/ResultadoSimulado";
import Button from "../components/Button";
import api from "../services/api";
import "./PerfilTrilha.css";

export default function PerfilTrilha() {
    const navigate = useNavigate();
    
    // Controladores de estado do fluxo da IA
    const [statusFluxo, setStatusFluxo] = useState("formulario"); // formulario | gerando | resultado
    const [dadosTrilhaGerada, setDadosTrilhaGerada] = useState(null);
    const [loadingSalvar, setLoadingSalvar] = useState(false);

    // Estados do Simulado
    const [questoes, setQuestoes] = useState([]);
    const [areaSelecionada, setAreaSelecionada] = useState("");
    const [loadingSimulado, setLoadingSimulado] = useState(false);
    const [resultadoSimulado, setResultadoSimulado] = useState(null);

    // Ações de API (Mantidas na página pai)
    const handleIniciarSimulado = async (areaDoCard) => {
        setLoadingSimulado(true);
        setAreaSelecionada(areaDoCard);
        try {
            const token = localStorage.getItem('@App:token');
            if (!token) {
                alert("Sua sessão expirou. Por favor, faça login novamente.");
                navigate("/login");
                return;
            }
            const response = await api.get(`/avaliacao/questoes?area=${areaDoCard}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setQuestoes(response.data);
            setStatusFluxo("simulado");
        } catch (error) {
            console.error("Erro detalhado do simulado:", error.response || error);
        
            // Se o banco retornar 401 mesmo com o código certo, o token expirou
            if (error.response?.status === 401) {
                alert("Sua sessão não é válida ou expirou. Faça login novamente.");
            } else {
                alert("Erro ao buscar o simulado.");
            }
        } finally {
            setLoadingSimulado(false);
        }
    };

    const handleFinalizarSimulado = async (payloadRespostas) => {
        try {
            const token = localStorage.getItem('@App:token');
            const response = await api.post('/avaliacao/enviar', {
                area: areaSelecionada,
                respostas: payloadRespostas
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 1. Guarda os dados detalhados que vieram do banco
            setResultadoSimulado(response.data);
            
            // 2. Avança o fluxo para a tela de feedback do simulado
            setStatusFluxo("resultado-simulado");
            // handleSolicitarTrilhaIA({ area: areaSelecionada, nivel: response.data.nivelVerificado });
        } catch (error) {
            alert("Erro ao processar respostas.");
        }
    };

    // Fase 1: Envia as escolhas do Card para o backend chamar a MentorIA
    const handleSolicitarTrilhaIA = async (dadosCard) => {
        setStatusFluxo("gerando");
        try {
            const token = localStorage.getItem('@App:token');
            
            // Chama o endpoint da mentoria para gerar o cronograma com IA
            const response = await api.post('/mentoria/gerar-trilha', {
                area: dadosCard.area,
                nivel: dadosCard.nivel
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Guarda o retorno (o JSONB esperado com { area, nivel, cronograma })
            setDadosTrilhaGerada(response.data);
            setStatusFluxo("resultado");

        } catch (error) {
            console.error("Erro ao gerar trilha com IA:", error);
            alert("Houve um erro da IA ao gerar sua trilha. Tente novamente.");
            setStatusFluxo("formulario");
        }
    };

    // Fase 2: Persiste a trilha revisada no Postgres
    const handleConfirmarEGraduarTrilha = async () => {
        setLoadingSalvar(true);
        try {
            const token = localStorage.getItem('@App:token');

            // Envia o payload completo que a IA gerou direto para o banco
            await api.post('/trilha/trilha', dadosTrilhaGerada, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Trilha salva no seu histórico com sucesso!");
            navigate("/home"); 

        } catch (error) {
            console.error("Erro ao persistir trilha no Postgres:", error);
            alert("Erro ao gravar trilha no banco de dados.");
        } finally {
            setLoadingSalvar(false);
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

                    <div className={`dashboard-split-container ${statusFluxo === "simulado" ? "simulado-ativo" : ""} ${statusFluxo === "resultado-simulado" ? "resultado-ativo" : ""}`}>
                        <section className="profile-form-section">
                            
                            {/* RENDERIZAÇÃO CONDICIONAL BASEADA NO STATUS DO FLUXO */}
                            {statusFluxo === "formulario" && (
                                <ProfileCard 
                                    mode="trilha" 
                                    onBackOrCancel={() => navigate("/home")} 
                                    onSave={handleSolicitarTrilhaIA}
                                    onVerificarNivel={handleIniciarSimulado}
                                    loading={loadingSimulado} 
                                />
                            )}

                            {/* 🚀 Renderização limpa e isolada do Simulado */}
                            {statusFluxo === "simulado" && (
                                <VerificacaoNivel 
                                    area={areaSelecionada}
                                    questoes={questoes}
                                    onCancelar={() => setStatusFluxo("formulario")}
                                    onEnviar={handleFinalizarSimulado}
                                />
                            )}
                            {statusFluxo === "resultado-simulado" && resultadoSimulado && (
                                <ResultadoSimulado 
                                    dados={resultadoSimulado} 
                                    questoesOriginal={questoes} // Passamos as questões para mostrar os enunciados
                                    onContinuar={() => handleSolicitarTrilhaIA({ area: areaSelecionada, nivel: resultadoSimulado.nivelVerificado })}
                                />
                            )}

                            {statusFluxo === "gerando" && (
                                <div className="auth-card glass-effect loading-ia-box">
                                    <div className="spinner"></div>
                                    <h3>A MentorIA está desenhando seu futuro...</h3>
                                    <p>Estamos estruturando os melhores módulos e aulas baseados no seu nível.</p>
                                </div>
                            )}

                            {statusFluxo === "resultado" && dadosTrilhaGerada && (
                                <div className="auth-card glass-effect resultado-trilha-box">
                                    <h2>Seu Cronograma Personalizado</h2>
                                    <p className="subtitle-resultado">
                                        Foco em <strong>{dadosTrilhaGerada.area}</strong> ({dadosTrilhaGerada.nivel})
                                    </p>
                                    
                                    <div className="cronograma-render-area">
                                        {dadosTrilhaGerada.cronograma?.modulos?.map((modulo, index) => (
                                            <div key={index} className="modulo-card">
                                                <h4>{modulo.titulo}</h4>
                                                <ul>
                                                    {modulo.aulas?.map((aula, idx) => (
                                                        <li key={idx}>🔹 {aula}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="profile-actions-row" style={{ marginTop: "20px" }}>
                                        <Button type="button" variant="link" onClick={() => setStatusFluxo("formulario")}>
                                            Refazer Escolhas
                                        </Button>
                                        <Button type="button" loading={loadingSalvar} onClick={handleConfirmarEGraduarTrilha}>
                                            Salvar no meu Perfil
                                        </Button>
                                    </div>
                                </div>
                            )}

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