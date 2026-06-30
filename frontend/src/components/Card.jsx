import { useEffect, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import robo from "../assets/robo.jpg";
import stylesBtn from "./Button.module.css";
import api from"../services/api";
import './Card.css'
import "../pages/PerfilTrilha";
import '../pages/PerfilTrilha.css'

export default function ProfileCard({ mode = "trilha", onBackOrCancel, onSave, onVerificarNivel, loading = false }) {
    // Estados compartilhados
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [area, setArea] = useState("");
    const [senha, setSenha] = useState("")
    const [nivelObjetivo, setNivelObjetivo] = useState("");
    const [nivelAtual, setNivelAtual] = useState("");
    const [mostrarInputLivre, setMostrarInputLivre] = useState(false)
    const [avatar, setAvatar] = useState(robo)
    // ◄ ADICIONADO: Controla se o formulário está liberado para edição no modo perfil
    const [editando, setEditando] = useState(false);

    // Dentro do seu ProfileCard
    const opcoesAreas = [
        { value: "javascript", label: "JavaScript & Ecossistema" },
        { value: "postgresql", label: "Banco de Dados (PostgreSQL)" },
        { value: "logica",     label: "Lógica de Programação" },
        { value: "fullstack",  label: "Desenvolvimento Full-Stack" },
        { value: "outro",      label: "➕ Outro (Digitar tema personalizado...)" }
    ];

    useEffect(() =>{
        if (mode === "perfil") {
            const carregarDadosDoUsuario = async () => {
                try{
                    const token = localStorage.getItem('@App:token');
                    if(!token) return;

                    const response = await api.get('user/perfil', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const dadosUsuario = response.data;
                    if(dadosUsuario.nome) setNome(dadosUsuario.nome);
                    if(dadosUsuario.email) setEmail(dadosUsuario.email);
                    if(dadosUsuario.avatar) setAvatar(dadosUsuario.avatar);
                } catch (error){
                    console.error({"Erro ao carregar perfil vindo do DB": error})
                    // Fallback de segurança: Se a API falhar, lê o que foi gravado no Login
                    const userString = localStorage.getItem('@App:user');
                    if (userString) {
                        const localUser = JSON.parse(userString);
                        setNome(localUser.nome || "");
                        setEmail(localUser.email || "");
                    }
                }
            };
            carregarDadosDoUsuario()
        }
    }, [mode])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "perfil" && !editando) {
        return;
    }
        if (mode === "trilha") {
            if (!area.trim()) {
            alert("Por favor, selecione uma área ou digite um tema personalizado.");
            return;
        }
            onSave({ 
                nome: area.trim(), 
                nivelAtual: nivel || "INICIANTE",
                nivelObjetivo: nivelObjetivo
             });
        } else {
            // ◄ MODIFICADO: Passa a senha junto se ela foi preenchida
            onSave({ nome, email, avatar, ...(senha && { senha }) });
            setEditando(false); // Fecha o modo edição após salvar
        }
    };

    const handleAdicionarNovaArea = () => {
        const novaArea = prompt("Digite a nova área de aprendizado:");
        if (novaArea) alert(`Área "${novaArea}" sugerida com sucesso!`);
    };

    const handleAlterarSenha = () => {
        const nova = prompt("Digite sua nova senha (mínimo 8 caracteres):");
        if (nova) {
            if(nova.length < 8) {
                alert("A senha precisa ter pelo menos 8 caracteres!");
                return;
            }
            setSenha(nova); // ◄ Guarda a senha temporariamente no estado
            alert("Nova senha definida! Clique em 'Salvar' para gravar no sistema.");
        }
    };

    return (
        <div className="auth-card glass-effect profile-reusable-card">
            {/* Se for modo Perfil, exibe o bloco de Avatar exigido */}
            {mode === "perfil" && (
                <div className="profile-avatar-block">
                    <img src={avatar || robo} alt="Avatar" className="profile-avatar-image" />
                    <h2>{nome || "Carregando..."}</h2>
                    <p>{email || "carregando..."}</p>

                    {/* ◄ ADICIONADO: Botão de alternância superior para quando NÃO está editando */}
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
                        <Input 
                            label="Nome" 
                            type="text" 
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)} 
                            required 
                            disabled={!editando} // ◄ Bloqueia se 'editando' for falso
                        
                        />
                        <Input 
                            label="E-mail" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            disabled={!editando} // ◄ Bloqueia se 'editando' for falso
                        />

                        {editando && (
                            <div style={{ textAlign: "right", marginBottom: "15px" }}>
                                <Button type="button" variant="link" onClick={handleAlterarSenha}>
                                    {senha ? "Senha Alterada" : "🔑 Alterar Senha"}
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <h1>Personalizar Trilha</h1>
                        
                            <div className="profile-label-row">
                                <h3 className="section-form-title" style={{ marginTop: 0 }}>Área de Aprendizado</h3>
                                                                 
                                    <Button onClick={handleAdicionarNovaArea}>
                                        Adicionar Nova
                                    </Button>
                                </div>
                            
                                <div className="profile-input-wrapper">
                                    <Select 
                                        value={mostrarInputLivre ? "outro" : area} 
                                        onChange={(e) => {
                                            if (e.target.value === "outro") {
                                                setMostrarInputLivre(true);
                                                setArea(""); // Limpa para o usuário poder digitar do zero no input livre
                                            } else {
                                                setMostrarInputLivre(false);
                                                setArea(e.target.value); // Grava a opção padrão diretamente em 'area'
                                            }
                                        }} 
                                        options={opcoesAreas} 
                                        required 
                                    />
                                </div>

                                {/* 🌟 RENDERIZAÇÃO CONDICIONAL: Se escolheu "Outro", o Input de texto livre aparece logo abaixo */}
                                {mostrarInputLivre && (
                                    <div className="profile-input-wrapper" style={{ marginTop: "10px", animation: "fadeIn 0.3s ease" }}>
                                        <Input 
                                            placeholder="Digite o tema exato (ex: Docker, React Native, Java...)" 
                                            type="text" 
                                            value={area} 
                                            onChange={(e) => setArea(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                )}

                           <div className="profile-label-row">
                             <h3 className="section-form-title">Nível de Conhecimento</h3>
                                
                                <Button type="button" 
                                    loading={loading} 
                                    onClick={() => {
                                        if (!area.trim()) {
                                            alert("Por favor, selecione uma área ou digite seu tema personalizado primeiro!");
                                            return;
                                        }
                                        onVerificarNivel(area); // Envia o valor (seja do Select ou do Input) para o simulado
                                    }}
                                >
                                    🚀 Fazer Avaliação por IA
                                </Button>
                            </div>
                        <div className="profile-input-wrapper">
                         

                            <div className="level-buttons-row">
                                {["INICIANTE", "INTERMEDIARIO", "AVANCADO"].map((lvl) => (
                                    <button
                                        key={lvl}
                                        type="button"
                                        className={`level-selection-btn ${nivelAtual === lvl ? "active" : ""}`}
                                        onClick={() => setNivelAtual(lvl)}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Ações Inferiores dinâmicas com base no modo */}
                <div className={stylesBtn.divBtn + " profile-actions-row"}>
                    {mode === "trilha" ? (
                        <>
                            <Button type="button" variant="link" onClick={onBackOrCancel}>Voltar</Button>
                            <Button type="submit" loading={loading}>Cadastrar</Button>
                        </>
                    ) : (
                        /* No modo perfil, os botões inferiores de Salvar/Cancelar só aparecem se estiver editando */
                        editando && (
                            <>
                                <Button type="button" variant="link" onClick={() => { setEditando(false); setSenha(""); }}>
                                    Cancelar
                                </Button>
                                <Button type="submit" loading={loading}>
                                    Salvar Alterações
                                </Button>
                            </>
                        )
                    )}
                </div>
            </form>
        </div>
    );
}