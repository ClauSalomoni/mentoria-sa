import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from '../components/Button.module.css'

export default function Login({irParaCadastro}){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)

        setTimeout(() =>{
            console.log("Tentativa de Login: ", {email, senha});

            setEmail("");
            setSenha("");

            setLoading(false);
            alert("Login simulado com sucesso!")
            
        }, 2000)
    };
    return(
        <div className="auth-card">
            <h2>Faça o seu Login para acessar a plataforma</h2>
            <form onSubmit={handleLogin}>
                <Input label="E-mail" type="email" value={email} placeholder= "Digite seu e-mail aqui..." onChange={(e) => setEmail(e.target.value)} required />
                <Input label="senha" type="password" value={senha} placeholder="Digite a sua senha aqui..." onChange={(e) => setSenha(e.target.value)} required />

                <div className={styles.divBtn}> 
                    <Button type="submit" loading={loading}>Entrar</Button>
                    <Button type="button" variant="link" onClick={irParaCadastro}>
                    Criar conta
                    </Button>
                </div>
            </form>

        </div>
    )
}