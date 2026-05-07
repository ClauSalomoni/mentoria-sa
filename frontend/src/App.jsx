import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import './App.css';
import robo from './assets/robo.jpg'
import RotaProtegida from './components/RotaProtegida';

function App() {
  
  return (
    <div className='main-container'>
      <div className='header-container'>
        <img src={robo} className='app-logo' alt="Logo"/>
        <h1 className='app-title'>Mentor IA +</h1>

      </div>
      {/* Definindo as rotas */}
      <Routes>
        {/* Se abrir a página limpa, ele redireciona para o cadastro */}
        <Route path="/" element={<Navigate to="/cadastro" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Exemplo de uma futura rota protegida */}
        <Route 
          path="/mentoria" 
          element={
            <RotaProtegida>
              <Home />
            </RotaProtegida>
          }
        />

      </Routes>
      
    </div>
  )
}

export default App
