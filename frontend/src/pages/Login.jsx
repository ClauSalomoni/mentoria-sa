import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from '../components/Button.module.css'
import api from '../services/api';
import robo from '../assets/robo.jpg'
import './Login.css';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate();

    useEffect(() => {
        setEmail("")
        setSenha("")
        return () => {
            setEmail("");
            setSenha("");
        };
    }, []);

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
            navigate('/home')

            //Limpei com useEffect antes do handleLogin!
            // setEmail('')
            // setSenha('')

                   
            
            // 5. Redirecionar o usuário (ex: para a Home)
            // window.location.href = '/dashboard'; 

    } catch (error) {
            // 🚨 CONFIGURAÇÃO INTELIGENTE DE ERROS:
        
        // Se o backend respondeu com o status 429 (Muitas requisições)
        if (error.response?.status === 429) {
            const mensagemBloqueio = error.response?.data?.erro || "Muitas tentativas. Tente novamente mais tarde.";
            alert(`⚠️ Bloqueado: ${mensagemBloqueio}`);
            
        } else {
            // Tratamento comum para outros erros (401 Dados inválidos, 403 Conta desativada, etc.)
            const mensagemErro = error.response?.data?.message || "Erro ao conectar com o servidor";
            alert(mensagemErro);
        }
    } finally {
        setLoading(false);
    }
};
    return(
        <div className="main-container">
            <div className="auth-card glass-effect">
                {/* Área da Logo integrada ao Card */}
                <div className="auth-logo-area">
                    <img src={robo} alt="MentorIA" className="auth-logo" />
                    <h2>Mentor IA +</h2>
                </div>
                
                <p className="auth-subtitle">Faça o seu Login para acessar a plataforma</p>
                
                <form onSubmit={handleLogin}>
                    <Input label="E-mail" type="email" value={email} placeholder="Digite seu e-mail..." onChange={(e) => setEmail(e.target.value)} required />
                    <Input label="Senha" type="password" value={senha} placeholder="Digite sua senha..." onChange={(e) => setSenha(e.target.value)} required />

                    <div className={styles.divBtn}> 
                        <Button type="submit" loading={loading}>Entrar</Button>
                        <Button type="button" variant="link" onClick={() => navigate('/cadastro')}>
                            Criar conta
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}