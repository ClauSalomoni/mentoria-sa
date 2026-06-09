import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import robo from '../assets/robo.jpg';
import './Mentoria.css'; 
import { IoSendSharp } from "react-icons/io5";
import IconButton from '../components/IconButton';

export default function Mentoria() {
    const navigate = useNavigate();
    const [mensagens, setMensagens] = useState([
        { id: 1, text: "Olá! Eu sou a sua MentorIA. Em que posso te ajudar nos estudos hoje?", sender: "ia" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Rola o chat para baixo automaticamente a cada nova mensagem
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mensagens]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: "user" };
        setMensagens(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            // 💡 Aqui você conectará com o seu back-end futuramente
            // const token = localStorage.getItem('@App:token');
            // const response = await fetch("http://localhost:3000/mentoria/chat", { ... })
            
            // Simulação de resposta da IA (MOCK) após 1.5 segundos:
            setTimeout(() => {
                const iaResponse = {
                    id: Date.now() + 1,
                    text: `Entendi a sua dúvida sobre "${userMessage.text}". Na trilha de programação, este conceito é fundamental porque otimiza o fluxo de dados...`,
                    sender: "ia"
                };
                setMensagens(prev => [...prev, iaResponse]);
                setLoading(false);
            }, 1500);

        } catch (error) {
            console.error("Erro ao falar com a IA:", error);
            setLoading(false);
        }
    };

    return (
        <div className="home-layout">
            {/* Mantemos a sua Sidebar Original para consistência de design */}
            <Sidebar paginaAtiva="mentoria" />

            <div className="main-content">
                <Header onLogout={() => { localStorage.clear(); navigate('/login'); }} />
                
                <main className="mentoria-body">
                    <div className="chat-container glass-effect">
                        <div className="chat-header">
                            <div className="ai-status-dot"></div>
                            <h3>Conversa com MentorIA</h3>
                        </div>

                        {/* Histórico de Mensagens */}
                        <div className="chat-messages">
                            {mensagens.map((msg) => (
                                <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                                    {msg.sender === 'ia' && <img src={robo} alt="IA" className="chat-avatar" />}
                                    <div className={`message-bubble ${msg.sender}`}>
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="message-wrapper ia">
                                    <img src={robo} alt="IA" className="chat-avatar" />
                                    <div className="message-bubble ia typing-indicator">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Campo de Input de Texto */}
                        <form onSubmit={handleSendMessage} className="chat-input-area">
                            <input 
                                type="text" 
                                placeholder="Pergunte sobre Python, SQL, peça um resumo ou simulado..." 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={loading}
                            />
                            <IconButton 
                                type="submit"
                                icon={IoSendSharp}
                                disabled={loading}
                            />
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}