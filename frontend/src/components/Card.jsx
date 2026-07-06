import { useEffect, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import robo from "../assets/robo.jpg";
import novoAvatar from "../assets/novoAvatar.webp";
import stylesBtn from "./Button.module.css";
import api from "../services/api";
import './Card.css';

export default function ProfileCard({ 
    mode = "trilha", 
    onBackOrCancel, 
    onSave, 
    onVerificarNivel, 
    loading = false,
    defaultNivelAtual = ""
}) {
    // Estados compartilhados e unificados
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [area, setArea] = useState(""); // Representa o nome da trilha/área no banco
    const [senha, setSenha] = useState("");
    const [nivelObjetivo, setNivelObjetivo] = useState("");
    const [nivelAtual, setNivelAtual] = useState("");
    const [mostrarInputLivre, setMostrarInputLivre] = useState(false);
    const [avatar, setAvatar] = useState(novoAvatar);
    const [editando, setEditando] = useState(false);

    const opcoesAreas = [
        { value: "javascript", label: "JavaScript & Ecossistema" },
        { value: "postgresql", label: "Banco de Dados (PostgreSQL)" },
        { value: "logica",     label: "Lógica de Programação" },
        { value: "fullstack",  label: "Desenvolvimento Full-Stack" }
    ];

    // Sincroniza o nível caso venha do simulado da IA
    useEffect(() => {
        if (defaultNivelAtual) {
            setNivelAtual(defaultNivelAtual);
        }
    }, [defaultNivelAtual]);

    useEffect(() => {
        if (mode === "perfil") {
            const carregarDadosDoUsuario = async () => {
                try {
                    const token = localStorage.getItem('@App:token');
                    if (!token) return;

                    const response = await api.get('user/perfil', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const dadosUsuario = response.data;
                    if (dadosUsuario.nome) setNome(dadosUsuario.nome);
                    if (dadosUsuario.email) setEmail(dadosUsuario.email);
                    if (dadosUsuario.avatar) setAvatar(dadosUsuario.avatar);
                } catch (error) {
                    console.error("Erro ao carregar perfil vindo do DB:", error);
                    const userString = localStorage.getItem('@App:user');
                    if (userString) {
                        const localUser = JSON.parse(userString);
                        setNome(localUser.nome || "");
                        setEmail(localUser.email || "");
                    }
                }
            };
            carregarDadosDoUsuario();
        }
    }, [mode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "perfil" && !editando) return;

        if (mode === "trilha") {
            if (!area.trim()) {
                alert("Por favor, selecione uma área ou digite um tema personalizado.");
                return;
            }
            if (!nivelAtual) {
                alert("Por favor, selecione seu nível atual ou clique em 'Avaliar com IA'.");
                return;
            }
            if (!nivelObjetivo) {
                alert("Por favor, selecione o seu nível objetivo.");
                return;
            }
            onSave({ 
                nome: area.trim(), 
                nivelAtual: nivelAtual,
                nivelObjetivo: nivelObjetivo
            });
        } else {
            onSave({ nome, email, avatar, ...(senha && { senha }) });
            setSenha("");
            setEditando(false);
        }
    };

    const handleAlternarInputLivre = () => {
        setArea(""); 
        setMostrarInputLivre(!mostrarInputLivre);
    };

    const handleAlterarSenha = () => {
        const nova = prompt("Digite sua nova senha (mínimo 8 caracteres):");
        if (nova) {
            if (nova.length < 8) {
                alert("A senha precisa ter pelo menos 8 caracteres!");
                return;
            }
            setSenha(nova);
            alert("Nova senha definida! Clique em 'Salvar' para gravar no sistema.");
        }
    };

    return (
        <div className="auth-card glass-effect profile-reusable-card">
            {mode === "perfil" && (
                <div className="profile-avatar-block">
                    <img src={avatar || novoAvatar} alt="Avatar" className="profile-avatar-image" />
                    <h2>{nome || "Carregando..."}</h2>
                    <p>{email || "carregando..."}</p>
                    {!editando && (
                        <Button type="button" onClick={() => setEditando(true)} style={{ marginTop: "10px" }}>
                            Editar Perfil
                        </Button>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit} className="profile-form-container">
                {mode === "perfil" ? (
                    <>
                        <h3 className="section-form-title" style={{ marginTop: 0 }}>Dados Pessoais</h3>
                        <Input label="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required disabled={!editando} />
                        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={!editando} />

                        {editando && (
                            <div style={{ textAlign: "right", marginBottom: "15px", marginTop: "10px" }}>
                                <Button type="button" variant="link" onClick={handleAlterarSenha}>
                                    {senha ? "✓ Senha Alterada" : "🔑 Alterar Senha"}
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <h1>Personalizar Trilha</h1>
                        
                        <div className="profile-label-row">
                            <h3 className="section-form-title" style={{ marginTop: 0 }}>Área de Aprendizado</h3>
                            <Button type="button" onClick={handleAlternarInputLivre} variant="button">
                                {mostrarInputLivre ? "Selecionar da Lista" : "➕ Adicionar Area"}
                            </Button>
                        </div>
                            
                        <div className="profile-input-wrapper">
                            {mostrarInputLivre ? (
                                <Input 
                                    placeholder="Ex: Docker, React Native, Java, Go..." 
                                    type="text" 
                                    value={area} 
                                    onChange={(e) => setArea(e.target.value)} 
                                    required 
                                />
                            ) : (
                                <Select 
                                    value={area} 
                                    onChange={(e) => setArea(e.target.value)} 
                                    options={opcoesAreas} 
                                    required 
                                />
                            )}
                        </div>

                        <div className="profile-label-row" style={{ marginTop: "20px" }}>
                            <h3 className="section-form-title">1. Seu Nível de Conhecimento Atual</h3>
                            <Button type="button" 
                                loading={loading} 
                                onClick={() => {
                                    if (!area.trim()) {
                                        alert("Por favor, escolha uma área antes de chamar a IA!");
                                        return;
                                    }
                                    onVerificarNivel(area); 
                                }}
                            >
                                🚀 Avaliar com IA
                            </Button>
                        </div>
                        
                        <div className="profile-input-wrapper">
                            <div className="level-buttons-row">
                                {["INICIANTE", "INTERMEDIARIO", "AVANCADO"].map((lvl) => (
                                    <button
                                        key={`atual-${lvl}`}
                                        type="button"
                                        className={`level-selection-btn ${nivelAtual === lvl ? "active-atual" : ""}`}
                                        onClick={() => {
                                            if (!area || area.trim() === "") {
                                                alert("Por favor, digite ou selecione uma ÁREA/CONTEÚDO antes de escolher o seu nível atual.");
                                                return; // Para a execução aqui e não deixa selecionar o nível
                                            }
                                            setNivelAtual(lvl)
                                        }}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="profile-label-row" style={{ marginTop: "24px" }}>
                            <h3 className="section-form-title">2. Qual Nível Você Deseja Chegar?</h3>
                        </div>
                        
                        <div className="profile-input-wrapper">
                            <div className="level-buttons-row">
                                {["INICIANTE", "INTERMEDIARIO", "AVANCADO"].map((lvl) => (
                                    <button
                                        key={`obj-${lvl}`}
                                        type="button"
                                        className={`level-selection-btn ${nivelObjetivo === lvl ? "active-objetivo" : ""}`}
                                        onClick={() => {
                                            
                                            // 🚀 VALIDAÇÃO: Garante que o tema foi preenchido primeiro
                                            if (!area || area.trim() === "") {
                                                alert("Por favor, digite ou selecione uma ÁREA/CONTEÚDO antes de escolher o seu nível objetivo.");
                                                return; // Bloqueia a seleção
                                            }
                                            setNivelObjetivo(lvl)
                                        }
                                        }
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <div className={stylesBtn.divBtn + " profile-actions-row"}>
                    {mode === "trilha" ? (
                        <>
                            <Button type="button" variant="link" onClick={onBackOrCancel}>Voltar</Button>
                            <Button type="submit" loading={loading}>Gerar Trilha</Button>
                        </>
                    ) : (
                        editando && (
                            <>
                                <Button type="button" variant="link" onClick={() => { setEditando(false); setSenha(""); }}>Cancelar</Button>
                                <Button type="submit" loading={loading}>Salvar Alterações</Button>
                            </>
                        )
                    )}
                </div>
            </form>
        </div>
    );
}