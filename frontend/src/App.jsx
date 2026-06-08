import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import "./styles/global.css"
import robo from './assets/robo.jpg'
import RotaProtegida from './components/RotaProtegida';
import Aulas from './pages/Aulas'
import Mentoria from './pages/Mentoria';

function App() {
  
  return (
    <>
      {/* Definindo as rotas */}
      <Routes>
        {/* Se abrir a página limpa, ele redireciona para o cadastro */}
        <Route path="/" element={<Navigate to="/cadastro" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Exemplo de uma futura rota protegida */}
        <Route 
          path="/home" 
          element={
            <RotaProtegida>
              
              <Home />
            </RotaProtegida>
          }
        />

        <Route 
          path="/curso/:cursoId" 
          element={
            <RotaProtegida>
              <Aulas /> 
            </RotaProtegida>
          }
        />

        <Route 
          path="/mentoria" 
          element={
            <RotaProtegida>
              <Mentoria />
            </RotaProtegida>
          }
        />
      </Routes>

      
      
    </>
  )
}

export default App
