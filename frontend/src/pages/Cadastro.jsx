import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import Input from "../components/Input";
import Button from "../components/Button";
import styles from '../components/Button.module.css'
import "./Home.css";
import api from '../services/api';
import robo from '../assets/robo.jpg';
import { useNavigate } from "react-router-dom";

export default function Cadastro(){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const navigate = useNavigate();

    const handlerRegister = async (e) =>{
        e.preventDefault();
        if (senha !== confirmarSenha){
            alert("As senhas não estão iguais!")
            return
        }

        setLoading(true)

        const payload = {nome, email, senha};
        try {
           const response = await api.post('/auth/cadastro', payload)
           console.log("JSON para o Backend: Resposta DO servidor:", response.data);
           console.log("Cadastro Sucesso:", response.data);
   
           alert("Cadastro realizado com sucesso!")
           navigate('/login')
           setNome("");
           setEmail("");
           setSenha("");
           setConfirmarSenha("");

           //redirecionando user:
        } catch (error){
            const mensagemErro = error.response?.data?.detalhes ||error.response?.data?.message || "Erro ao realizar cadastro"
            console.error("Erro no cadastro:", error.response?.data);
            alert(`Erro no cadastro: ${mensagemErro}`)

        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="main-container">
            <div className="welcome-area" style={{ textAlign: 'center' }}>
                <h1>Mentor IA</h1>
                <p>Nossa plataforma conecta você a uma IA especialista que avalia o que você já sabe em tecnologia e identifica onde precisa melhorar.Faça testes práticos, receba um plano de estudos guiado sob medida e saiba exatamente o que e quanto estudar para dominar novas habilidades.</p>
            </div>
            <div className="auth-card glass-effect">
                {/* Área da Logo integrada ao Card */}
                <div className="auth-logo-area">
                    <img src={robo} alt="MentorIA" className="auth-logo" />
                    <h2>Crie seu Roadmap com IA</h2>
                </div>
                
                <p className="auth-subtitle">Crie uma Conta ou faça o login para usar a plataforma</p>
                
                <form onSubmit={handlerRegister}>
                    <Input label="Nome Completo" type="text" value={nome} placeholder="Seu Nome..." onChange={(e) => setNome(e.target.value)} required/>
                    <Input label="E-mail" type="email" value={email} placeholder="Seu e-mail..." onChange={(e) => setEmail(e.target.value)} required/>
                    <Input label="Senha" type="password" value={senha} placeholder="Sua senha (mínimo  8 caracteres)" onChange={(e) => setSenha(e.target.value)} required/>
                    <Input label="Confirmar Senha" type="password" value={confirmarSenha} placeholder="Confirme a sua senha" onChange={(e) => setConfirmarSenha(e.target.value)} required/>
                    
                
                    <div className={styles.divBtn}>
                        <Button type="submit" loading={loading}>Cadastrar</Button>
                        <Button type="button" variant="link" onClick={() => navigate('/login')}>
                            Fazer Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}