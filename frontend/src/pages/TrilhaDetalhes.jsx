import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import Button from "../components/Button";
import './TrilhaDetalhes.css';

export default function TrilhaDetalhes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trilha, setTrilha] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarDadosDaTrilha = async () => {
            try {
                const token = localStorage.getItem('@App:token');
                const response = await api.get(`/trilhas/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTrilha(response.data);
            } catch (error) {
                console.error("Erro ao carregar detalhes:", error);
            } finally {
                setLoading(false);
            }
        };
        buscarDadosDaTrilha();
    }, [id]);

    const listaPlanos = trilha?.planoEstudos || trilha?.planos || [];

    return (
        <div className="home-layout">
            <Sidebar paginaAtiva="trilha" />
            <div className="main-content">
                <Header onLogout={() => { localStorage.clear(); navigate("/login"); }} showBackButton={true} />
                <main className="dashboard-body">
                    {loading ? (
                        <div className="spinner-center"><div className="spinner"></div></div>
                    ) : !trilha ? (
                        <p>Trilha não encontrada.</p>
                    ) : (
                        <div className="auth-card glass-effect resultado-trilha-box" style={{ width: '100%', maxWidth: '900px' }}>
                            <h2>{trilha.nome}</h2>
                            <p className="subtitle-resultado">Nível: <strong>{trilha.nivelAtual}</strong> ➔ Objetivo: <strong>{trilha.nivelObjetivo}</strong></p>
                            
                            <div className="cronograma-render-area" style={{ marginTop: '20px' }}>
                                {listaPlanos.map((plano, index) => (
                                    <div key={plano.id || index} className="modulo-card">
                                        <h4>Etapa {plano.ordem}: {plano.titulo}</h4>
                                        <p>{plano.descricao}</p>
                                        <div className="plano-meta-info">
                                            <small>⏱️ Tempo Estimado: {
                                                                            plano.tempoEstimado && !isNaN(plano.tempoEstimado) 
                                                                                ? `${plano.tempoEstimado}h` 
                                                                                : '2h'
                                                                        }</small>
                                            <span className={`status-badge ${plano.status.toLowerCase()}`}>{plano.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}