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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarTrilhasSalvas = async () => {
            try {
                const token = localStorage.getItem('@App:token');
                // 🌟 O GET acontece aqui, na página de listagem!
                const response = await api.get('/trilhas', {
                    headers: { Authorization: `Bearer ${token}` }
                    });
                // console.log("=== DIAGNÓSTICO DO BACKEND ===");
                // console.log("O que chegou no Front:", response.data);
                setTrilhas(response.data);
            } catch (error) {
                console.error("Erro ao listar trilhas:", error);
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
                            + Criar Nova Trilha
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
                                        <button onClick={() => navigate(`/trilha/${t.id}`)}>Acessar Conteúdo</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}