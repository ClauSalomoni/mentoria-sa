import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "./MinhasTrilhas.css";
import Button from "../components/Button";
 

export default function MinhasTrilhas() {
    const navigate = useNavigate();
    const [trilhas, setTrilhas] = useState([]);
    const [avaliacoesHistorico, setAvaliacoesHistorico] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarTrilhasSalvas = async () => {
            try {
                const token = localStorage.getItem('@App:token');
                
                // Realiza as duas requisições de forma simultânea
                const [responseTrilhas, responseAvaliacoesHistorico] = await Promise.all([
                    api.get('/trilhas', { headers: { Authorization: `Bearer ${token}` } }),
                    api.get('/trilhas/avaliacoes/historico', { headers: { Authorization: `Bearer ${token}` } })
                ]);
                
                setTrilhas(responseTrilhas.data);
                setAvaliacoesHistorico(responseAvaliacoesHistorico.data);
            } catch (error) {
                console.error("Erro ao carregar dados do dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        buscarTrilhasSalvas();
    }, []);

    return (
        <div className="home-layout">
            <Sidebar paginaAtiva="trilha" />
            <div className="main-content">
                <Header onLogout={() => { localStorage.clear(); navigate("/login"); }} showBackButton={false} />
                
                <main className="dashboard-body">
                    <section className="welcome-area" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1>Minhas Trilhas de Estudo</h1>
                            <p>Gerencie seus cronogramas gerados por Inteligência Artificial.</p>
                        </div>
                        {/* Botão para abrir o gerador extenso */}
                        <Button className="btn-criar-nova" onClick={() => navigate("/criar-trilha")}>
                            + Criar Trilha
                        </Button>
                    </section>

                    <div className="trilhas-grid">
                        {loading ? (
                            <div className="spinner-center"><div className="spinner"></div></div>
                        ) : trilhas.length === 0 ? (
                            <div className="card-vazio glass-effect">
                                <h3>Nenhuma trilha encontrada</h3>
                                <p>Você ainda não gerou nenhuma trilha de estudos com nossa IA. Clique no botão acima para começar!</p>
                            </div>
                        ) : (
                            trilhas.map((t) => (
                                <div key={t.id} className="trilha-card-salva glass-effect">
                                    <div className="trilha-card-header">
                                        <h3>{t.nome}</h3>
                                        <span className="badge-nivel">{t.nivelAtual}</span>
                                    </div>
                                    <p>Objetivo final: {t.nivelObjetivo}</p>
                                    <div className="trilha-card-footer">
                                        <span>📚 {t.planoEstudos?.length || 0} Módulos</span>
                                        <button onClick={() => navigate(`/trilha/${t.id}`)}>Ver Plano de Estudo</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                        {/* 🌟 NOVA SEÇÃO: Tabela de Histórico de Avaliações */}
                    <section className="avaliacoes-section" style={{ marginTop: "40px" }}>
                        <div className="section-header" style={{ marginBottom: "15px" }}>
                            <h2>Histórico de Avaliações e Simulados</h2>
                            <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>Acompanhe sua evolução e as notas calculadas pela MentorIA.</p>
                        </div>

                        {loading ? (
                            <p className="text-center">Carregando histórico...</p>
                        ) : avaliacoesHistorico.length === 0 ? (
                            <div className="card-vazio glass-effect" style={{ padding: "20px", textAlign: "center" }}>
                                <p style={{ color: "#9ca3af" }}>Nenhum simulado ou avaliação concluída neste perfil.</p>
                            </div>
                        ) : (
                            <div className="tabela-container glass-effect" style={{ overflowX: "auto", borderRadius: "12px" }}>
                                <table className="avaliacoes-table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                                    <thead>
                                        <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", background: "rgba(0, 0, 0, 0.05)" }}>
                                            <th style={{ padding: "12px 16px" }}>Data</th>
                                            <th style={{ padding: "12px 16px" }}>Trilha / Área</th>
                                            <th style={{ padding: "12px 16px" }}>Nota / Pontuação</th>
                                            <th style={{ padding: "12px 16px" }}>Nível Anterior</th>
                                            <th style={{ padding: "12px 16px" }}>Nível Atual</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {avaliacoesHistorico.map((av) => (
                                            <tr key={av.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }} className="table-row-hover">
                                                <td style={{ padding: "12px 16px" }}>
                                                    {new Date(av.dataAvaliacao || av.createdAt).toLocaleDateString()}
                                                </td>
                                                <td style={{ padding: "12px 16px", fontWeight: "600" }}>
                                                    {av.trilha?.nome || "Avaliação de Nível"}
                                                </td>
                                                <td style={{ padding: "12px 16px" }}>
                                                    <span className="nota-badge" style={{ 
                                                        background: av.pontuacao >= 7 ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                                                        color: av.pontuacao >= 7 ? "#10b981" : "#f59e0b",
                                                        padding: "4px 8px", borderRadius: "6px", fontWeight: "bold"
                                                    }}>
                                                        {av.pontuacao.toFixed(1)}
                                                    </span>
                                                </td>
                                                <td style={{ padding: "12px 16px", color: "#9ca3af" }}>
                                                    {av.nivelAnterior || "—"}
                                                </td>
                                                <td style={{ padding: "12px 16px" }}>
                                                    <span className="badge-nivel" style={{ fontSize: "0.8rem" }}>
                                                        {av.nivelAtual}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>

                </main>
            </div>
        </div>
    );
}