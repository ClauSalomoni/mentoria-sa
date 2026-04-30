import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from '../components/Button.module.css'

export default function Cadastro({irParaLogin}){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const handlerRegister = (e) =>{
        e.preventDefault();
        if (senha !== confirmarSenha){
            alert("As senhas não estão iguais!")
            return
        }
        const payload = {nome, email, senha};
        console.log("JSON para o Backend:", JSON.stringify(payload, null, 2))

        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
        alert("Cadastro realizado com sucesso!")
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