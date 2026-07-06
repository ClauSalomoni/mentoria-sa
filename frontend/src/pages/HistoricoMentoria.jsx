import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import robo from '../assets/robo.jpg';
import './Mentoria.css'; // Reutiliza seus estilos idênticos para não quebrar o layout
import api from '../services/api'; // Seu axios configurado
import ReactMarkdown from "react-markdown";

export default function HistoricoMentoria() {
    const navigate = useNavigate();
    const [mensagens, setMensagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const chatEndRef = useRef(null);

    // Rola o chat para baixo automaticamente quando o histórico carrega
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mensagens]);

    // Carrega o histórico vindo do Sequelize ao abrir a página
    useEffect(() => {
        async function carregarHistorico() {
            try {
                const token = localStorage.getItem('@App:token');
                
                // Faz a requisição GET para a rota que criamos no backend
                const response = await api.get('/mentoria/historico', {
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    }
                });

                // O Sequelize retorna uma lista de registros { id, pergunta, resposta, createdAt }
                // Precisamos transformar cada registro em DUAS mensagens na tela (User e IA)
                const mensagensFormatadas = [];
                
                response.data.forEach((chat) => {
                    // 1. Mensagem enviada pelo Usuário (Pergunta)
                    mensagensFormatadas.push({
                        id: `user-${chat.id}`,
                        text: chat.pergunta,
                        sender: 'user',
                        dataHora: chat.createdAt
                    });
                    
                    // 2. Mensagem gerada pela IA (Resposta)
                    mensagensFormatadas.push({
                        id: `ia-${chat.id}`,
                        text: chat.resposta,
                        sender: 'ia',
                        dataHora: chat.createdAt
                    });
                });

                setMensagens(mensagensFormatadas);
            } catch (error) {
                console.error("Erro ao carregar o histórico:", error);
                if (error.response?.status === 401) {
                    alert("Sua sessão expirou. Por favor, faça login novamente.");
                    localStorage.clear();
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        }

        carregarHistorico();
    }, [navigate]);

    return (
        <div className="home-layout">
            {/* Mantém a sidebar marcando a página de histórico ativa se preferir */}
            <Sidebar paginaAtiva="historico" />

            <div className="main-content">
                <Header onLogout={() => { localStorage.clear(); navigate('/login'); }} showBackButton={true}/>
                
                <main className="mentoria-body">
                    <div className="chat-container glass-effect">
                        <div className="chat-header">
                            <div className="ai-status-dot" style={{ backgroundColor: '#6b7280' }}></div> {/* Cinza indicando histórico antigo */}
                            <h3>Meu Histórico com MentorIA</h3>
                        </div>

                        {/* Histórico de Mensagens */}
                        <div className="chat-messages">
                            {loading ? (
                                <div className="text-center p-6 text-gray-500">Carregando histórico...</div>
                            ) : mensagens.length === 0 ? (
                                <div className="text-center p-6 text-gray-500">Nenhuma conversa gravada ainda.</div>
                            ) : (
                                mensagens.map((msg) => (
                                    <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                                        {msg.sender === 'ia' && <img src={robo} alt="IA" className="chat-avatar" />}
                                        <div className={`message-bubble ${msg.sender}`}>
                                            {msg.sender === 'ia' ? (
                                                <div className="markdown-container">
                                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p>{msg.text}</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        
                        {/* Removemos o formulário de input por ser uma página apenas de leitura de histórico */}
                        <div className="chat-input-area" style={{ justifyContent: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>
                            <span>Modo de Visualização de Histórico</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}