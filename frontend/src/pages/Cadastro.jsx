import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from '../components/Button.module.css'
import api from '../services/api';

export default function Cadastro({irParaLogin}){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirmarSenha, setConfirmarSenha] = useState('')

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
           console.log("JSON para o Backend: Resposta DO servidor:", response.data)
   
           alert("Cadastro realizado com sucesso!")
           setNome("");
           setEmail("");
           setSenha("");
           setConfirmarSenha("");

           //redirecionando user:
           irParaLogin()
        } catch (error){
            const msg = error.response?.data?.error || "Erro ao realizar cadastro"

        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="auth-card">
            <h2>Crie sua Conta para usar a plataforma</h2>
            <form onSubmit={handlerRegister}>
                <Input label="Nome Completo" type="text" value={nome} placeholder="Digite seu nome aqui..." onChange={(e) => setNome(e.target.value)} required/>
                <Input label="E-mail" type="email" value={email} placeholder="Digite seu e-mail aqui..." onChange={(e) => setEmail(e.target.value)} required/>
                <Input label="Senha" type="password" value={senha} placeholder="Digite a sua senha aqui..." onChange={(e) => setSenha(e.target.value)} required/>
                <Input label="Confirmar Senha" type="password" value={confirmarSenha} placeholder="Confirme a sua senha" onChange={(e) => setConfirmarSenha(e.target.value)} required/>
                <Button type="submit">Cadastrar</Button>
            </form>
            <div className={styles.divBtn}>
                <Button type="button" variant="link" onClick={irParaLogin}>
                Fazer Login
                </Button>
            </div>

        </div>
    )
}