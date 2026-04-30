import { useState } from 'react';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import './App.css';
import robo from './assets/robo.jpg'

function App() {
  const [telaAtiva, setTelaAtiva] = useState('cadastro');
  

  return (
    <div className='main-container'>
      <div className='header-container'>
        <img src={robo} className='app-logo' alt="Logo"/>
        <h1 className='app-title'>Mentor IA +</h1>

      </div>
      {telaAtiva === 'login' && <Login irParaCadastro={() => setTelaAtiva('cadastro')} />}
      {telaAtiva === 'cadastro' && <Cadastro irParaLogin={() => setTelaAtiva('login')} />}
      
    </div>
  )
}

export default App
