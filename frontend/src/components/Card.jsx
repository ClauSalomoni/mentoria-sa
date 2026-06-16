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

export default function ProfileCard({ mode = "trilha", onBackOrCancel, onSave, loading = false }) {
    // Estados compartilhados
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [area, setArea] = useState("");
    const [nivel, setNivel] = useState("");
    const [avatar, setAvatar] = useState(robo)

    const opcoesAreas = [
        { value: "frontend", label: "Desenvolvimento Front-End" },
        { value: "backend", label: "Desenvolvimento Back-End" },
        { value: "fullstack", label: "Desenvolvimento Full-Stack" },
        { value: "data", label: "Ciência de Dados & IA" }
    ];

    useEffect(() =>{
        if (mode === "perfil") {
            const carregarDadosDoUsuario = async () => {
                try{
                    const token = localStorage.getItem('@App:token');
                    if(!token) return;

                    const response = await api.get('auth/perfil', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const dadosUsuario = response.data;
                    if(dadosUsuario.nome) setNome(dadosUsuario.nome);
                    if(dadosUsuario.email) setNome(dadosUsuario.email);
                    if(dadosUsuario.avatarUrl) setNome(dadosUsuario.avatarUrl);
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
        if (mode === "trilha") {
            onSave({ area, nivel });
        } else {
            onSave({ nome, email });
        }
    };

    const handleAdicionarNovaArea = () => {
        const novaArea = prompt("Digite a nova área de aprendizado:");
        if (novaArea) alert(`Área "${novaArea}" sugerida com sucesso!`);
    };

    const handleAlterarSenha = () => {
        const nova = prompt("Digite sua nova senha:");
        if (nova) alert("Senha alterada localmente!");
    };

    return (
        <div className="auth-card glass-effect profile-reusable-card">
            {/* Se for modo Perfil, exibe o bloco de Avatar exigido */}
            {mode === "perfil" && (
                <div className="profile-avatar-block">
                    <img src={avatar || robo} alt="Avatar" className="profile-avatar-image" />
                    <h2>{nome || "Carregando..."}</h2>
                    <p>{email || "carregando..."}</p>
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
                        />
                        <Input 
                            label="E-mail" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <div style={{ textAlign: "right", marginBottom: "15px" }}>
                            <Button type="button" variant="link" onClick={handleAlterarSenha}>
                                Alterar Senha
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Minha Trilha</h1>
                        
                            <div className="profile-label-row">
                                <h3 className="section-form-title" style={{ marginTop: 0 }}>Área de Aprendizado</h3>
                                                                 
                                    <Button onClick={handleAdicionarNovaArea}>
                                        Adicionar Nova
                                    </Button>
                                </div>
                            
                                <div className="profile-input-wrapper">
                                    <Select 
                                        value={area} 
                                        onChange={(e) => setArea(e.target.value)} 
                                        options={opcoesAreas} 
                                        required 
                                    />
                                </div>

                           <div className="profile-label-row">
                             <h3 className="section-form-title">Nível de Conhecimento</h3>
                                
                                <Button onClick={() => alert("Dica sobre os níveis!")}>
                                    Verificar Nível
                                </Button>
                            </div>
                        <div className="profile-input-wrapper">
                         

                            <div className="level-buttons-row">
                                {["Iniciante", "Intermediário", "Avançado"].map((lvl) => (
                                    <button
                                        key={lvl}
                                        type="button"
                                        className={`level-selection-btn ${nivel === lvl ? "active" : ""}`}
                                        onClick={() => setNivel(lvl)}
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
                    <Button type="button" variant="link" onClick={onBackOrCancel}>
                        {mode === "trilha" ? "Voltar" : "Cancelar"}
                    </Button>
                    <Button type="submit" loading={loading}>
                        {mode === "trilha" ? "Cadastrar" : "Salvar"}
                    </Button>
                </div>
            </form>
        </div>
    );
}