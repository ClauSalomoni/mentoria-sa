import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import "./styles/global.css"
import robo from './assets/robo.jpg'
import RotaProtegida from './components/RotaProtegida';

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
          path="/mentoria" 
          element={
            <RotaProtegida>
              <Home />
            </RotaProtegida>
          }
        />

      </Routes>
      
    </>
  )
}

export default App
