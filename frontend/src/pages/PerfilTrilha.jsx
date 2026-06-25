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
            const response = await api.post('/trilhas/avaliacao', {area: areaDoCard}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 🌟 CORREÇÃO AQUI: Garanta que estamos pegando a propriedade 'questoes' que é o Array.
            // Se ela não existir, usamos um array vazio de fallback para evitar o erro de .map()
            const listaQuestoes = response.data.questoes || (Array.isArray(response.data) ? response.data : []);
            
            if (listaQuestoes.length === 0) {
                throw new Error("A IA não retornou uma lista de questões válida.");
            }

            setQuestoes(listaQuestoes);
            setStatusFluxo("simulado");
        } catch (error) {
            console.error("Erro detalhado do simulado:", error.response || error);
            alert("Erro ao buscar smulado gerado pela IA")
        
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
        setStatusFluxo("gerando");
        try {
            const token = localStorage.getItem('@App:token');
            const response = await api.post('/trilhas/avaliacao/responder', {
                area: areaSelecionada,
                respostas: payloadRespostas
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data.avaliacao)
            const { avaliacao, trilha, planos } = response.data;
            // 1. Guarda os dados detalhados que vieram do banco
            setResultadoSimulado(avaliacao);
            
            // Guarda os dados da trilha e planos que o banco acabou de persistir
            setDadosTrilhaGerada({
                nome: response.data.trilha.nome,
                nivelAtual: trilha.nivelAtual,
                nivelObjetivo: response.data.trilha.nivelObjetivo,
                planos: planos 
            });
            setStatusFluxo("resultado-simulado");
            // handleGerarTrilhaIA({ area: areaSelecionada, nivel: response.data.nivelVerificado });
        } catch (error) {
            console.error(error);
            alert("Erro ao processar respostas e gerar trilha.");
            setStatusFluxo("formulario");
            alert("Erro ao processar respostas.");
        }
    };

    // Fase 1: Envia as escolhas do Card para o backend chamar a MentorIA
    const handleGerarTrilhaIA = async (dadosCard) => {
        setStatusFluxo("gerando");
        try {
            const token = localStorage.getItem('@App:token');
            
            // Chama o endpoint da mentoria para gerar o cronograma com IA
            const response = await api.post('/trilhas', {
                nome: dadosCard.area,              // O tema escolhido
                nivelAtual: dadosCard.nivel || "INICIANTE", 
                nivelObjetivo: dadosCard.nivelObjetivo || "AVANCADO"
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // O backend já salva a trilha e os planos no banco de dados e nos retorna o objeto pronto
            setDadosTrilhaGerada({
                nome: response.data.trilha.nome,
                nivelAtual: response.data.trilha.nivelAtual,
                nivelObjetivo: response.data.trilha.nivelObjetivo,
                planos: response.data.planos
            });
            setStatusFluxo("resultado");

        } catch (error) {
            console.error("Erro ao gerar trilha com IA:", error);
            alert("Houve um erro da IA ao gerar sua trilha. Tente novamente.");
            setStatusFluxo("formulario");
        }
    };

    // Como os dados já estão salvos no banco pelo backend, esta função apenas parabeniza e redireciona
    const handleConfirmarRedirecionamento = () => {
        alert("Sua trilha já está ativa e salva no seu perfil!");
        navigate("/trilhas"); 
    };

    // Fase 2: Persiste a trilha revisada no Postgres
    // const handleConfirmarEGraduarTrilha = async () => {
    //     setLoadingSalvar(true);
    //     try {
    //         const token = localStorage.getItem('@App:token');

    //         // Envia o payload completo que a IA gerou direto para o banco
    //         await api.post('/trilha/trilha', dadosTrilhaGerada, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });

    //         alert("Trilha salva no seu histórico com sucesso!");
    //         navigate("/home"); 

    //     } catch (error) {
    //         console.error("Erro ao persistir trilha no Postgres:", error);
    //         alert("Erro ao gravar trilha no banco de dados.");
    //     } finally {
    //         setLoadingSalvar(false);
    //     }
    // };

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
                                    onSave={handleGerarTrilhaIA}
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
                                    onContinuar={() => setStatusFluxo("resultado")}
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
                                        Foco em: <strong>{dadosTrilhaGerada.nome}</strong> <br/>
                                        Seu Nível Alvo: <strong>{dadosTrilhaGerada.nivelObjetivo}</strong>
                                    </p>
                                    
                                    <div className="cronograma-render-area">
                                        {/* Mapeia a lista de planos de estudo criada no banco */}
                                        {dadosTrilhaGerada.planos?.map((plano, index) => (
                                            <div key={plano.id || index} className="modulo-card">
                                                {/* 🌟 Acessando propriedades exatas do seu model planoEstudo */}
                                                <h4>Etapa {plano.ordem}: {plano.titulo}</h4>
                                                <p>{plano.descricao}</p>
                                                <div className="plano-meta-info">
                                                    <small>⏱️ Tempo Estimado: {plano.tempoEstimado}h</small>
                                                    <span className={`status-badge ${plano.status.toLowerCase()}`}>
                                                        {plano.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="profile-actions-row" style={{ marginTop: "20px" }}>
                                        <Button type="button" variant="link" onClick={() => setStatusFluxo("formulario")}>
                                            Refazer Escolhas
                                        </Button>
                                        <Button type="button" onClick={handleConfirmarRedirecionamento}>
                                            Ir para meus Estudos (Dashboard)
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