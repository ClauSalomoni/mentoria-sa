import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from '../components/Button.module.css'
import api from '../services/api';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate();

    const handleLogin = async (e) => { //precisa ASYNC!
        e.preventDefault()
        setLoading(true);

    try {
            // 3. Faça a chamada real para o seu Backend
            const response = await api.post('/auth/login', { email, senha });

            // 4. Se chegou aqui, o login deu certo. Guardamos o Token!
            const { token, user } = response.data;
            
            localStorage.setItem('@App:token', token);
            localStorage.setItem('@App:user', JSON.stringify(user));

            alert(`Bem-vindo(a) ${user.nome}!`);
            navigate('/mentoria')
            setEmail('')
            setSenha('')

                   
            
            // 5. Redirecionar o usuário (ex: para a Home)
            // window.location.href = '/dashboard'; 

    } catch (error) {
            // 6. Tratamento de erro (CORS, Senha errada, Conta desativada)
            const mensagemErro = error.response?.data?.error || "Erro ao conectar com o servidor";
            alert(mensagemErro);
    } finally {
        setLoading(false);
    }
};
    return(
        <div className="auth-card">
            <h2>Faça o seu Login para acessar a plataforma</h2>
            <form onSubmit={handleLogin}>
                <Input label="E-mail" type="email" value={email} placeholder= "Digite seu e-mail aqui..." onChange={(e) => setEmail(e.target.value)} required />
                <Input label="senha" type="password" value={senha} placeholder="Digite a sua senha aqui..." onChange={(e) => setSenha(e.target.value)} required />

                <div className={styles.divBtn}> 
                    <Button type="submit" loading={loading}>Entrar</Button>
                    <Button type="button" variant="link" onClick={() => navigate('/cadastro')}>
                    Criar conta
                    </Button>
                </div>
            </form>

        </div>
    )
}