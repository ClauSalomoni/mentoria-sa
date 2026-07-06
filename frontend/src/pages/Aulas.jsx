import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Aulas.css"; // Vamos criar o CSS no próximo passo

import IconButton from "../components/IconButton";

export default function Aulas() {
    const { cursoId } = useParams(); // Pega o ID (ex: 1, 2) vindo da URL
    const navigate = useNavigate();
    const token = localStorage.getItem('@App:token');

    const [curso, setCurso] = useState(null);
    const [aulas, setAulas] = useState([]);
    const [aulaAtiva, setAulaAtiva] = useState(null); // Guarda a aula tocando no momento
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        // Carrega os detalhes do Curso e as Aulas em paralelo
        Promise.all([
            fetch(`http://localhost:3000/curso/${cursoId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then(res => res.json()),
            
            fetch(`http://localhost:3000/curso/${cursoId}/aulas`, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then(res => res.json())
        ])
        .then(([dadosCurso, dadosAulas]) => {
            setCurso(dadosCurso);
            setAulas(dadosAulas);
            
            // Se o curso tiver aulas, já coloca a primeira aula ativa no Player
            if (dadosAulas && dadosAulas.length > 0) {
                setAulaAtiva(dadosAulas[0]);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Erro ao carregar dados do curso:", err);
            setLoading(false);
        });
    }, [cursoId, token, navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (loading) {
        return <div className="loading-screen">Carregando conteúdo adaptativo...</div>;
    }

    return (
        <div className="player-layout">
            <div className="player-main-content">
                <Header onLogout={handleLogout} showBackButton={true}/>
                  

                <main className="player-body">
                    {/* COLUNA DA ESQUERDA: O Player de Vídeo e Detalhes */}
                    <section className="video-column">
                        <div className="video-wrapper glass-effect">
                            {aulaAtiva ? (
                                <iframe
                                    src={aulaAtiva.videoUrl} 
                                    title={aulaAtiva.titulo}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="no-video">Nenhum vídeo disponível para esta aula.</div>
                            )}
                        </div>
                        <div className="aula-info-area">
                            <h2>{aulaAtiva ? aulaAtiva.titulo : "Selecione uma aula"}</h2>
                            <p className="curso-tag" style={{ color: curso?.cor }}>
                                Curso: {curso?.titulo}
                            </p>
                            <p className="aula-descricao">
                                {aulaAtiva?.descricao || "Esta aula não possui descrição cadastrada."}
                            </p>
                        </div>
                    </section>

                    {/* COLUNA DA DIREITA: Playlist de Aulas */}
                    <aside className="playlist-column glass-effect">
                        <h3>Conteúdo do Curso</h3>
                        <div className="playlist-container">
                            {aulas.length === 0 ? (
                                <p className="empty-playlist">Nenhuma aula cadastrada ainda.</p>
                            ) : (
                                aulas.map((aula, index) => (
                                    <div 
                                        key={aula.id} 
                                        className={`playlist-item ${aulaAtiva?.id === aula.id ? 'ativa' : ''}`}
                                        onClick={() => setAulaAtiva(aula)}
                                    >
                                        <span className="aula-index">{index + 1}</span>
                                        <div className="playlist-item-info">
                                            <h4>{aula.titulo}</h4>
                                            <span>{aula.duracao || "10min"}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
}