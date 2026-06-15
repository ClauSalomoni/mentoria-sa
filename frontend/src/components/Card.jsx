import { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import robo from "../assets/robo.jpg";
import stylesBtn from "./Button.module.css";
import './Card.css'
import "../pages/PerfilTrilha";
import '../pages/PerfilTrilha.css'

export default function ProfileCard({ mode = "trilha", onBackOrCancel, onSave, loading = false }) {
    // Estados compartilhados
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [area, setArea] = useState("");
    const [nivel, setNivel] = useState("");

    const opcoesAreas = [
        { value: "frontend", label: "Desenvolvimento Front-End" },
        { value: "backend", label: "Desenvolvimento Back-End" },
        { value: "fullstack", label: "Desenvolvimento Full-Stack" },
        { value: "data", label: "Ciência de Dados & IA" }
    ];

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
                    <img src={robo} alt="Avatar" className="profile-avatar-image" />
                    <h2>{nome}</h2>
                    <p>{email}</p>
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
                        <h3 className="section-form-title" style={{ marginTop: 0 }}>Área de Aprendizado</h3>
                        <div className="profile-input-wrapper">
                            <label className="profile-field-label">Opções de áreas</label>
                            <div className="select-with-action-row">
                                <div className="select-grow-container">
                                    <Select 
                                        value={area} 
                                        onChange={(e) => setArea(e.target.value)} 
                                        options={opcoesAreas} 
                                        required 
                                    />
                                </div>
                                <button type="button" className="btn-add-inline" onClick={handleAdicionarNovaArea}>
                                    +
                                </button>
                            </div>
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
                        Salvar
                    </Button>
                </div>
            </form>
        </div>
    );
}