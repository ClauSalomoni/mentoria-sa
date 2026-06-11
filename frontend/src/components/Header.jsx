import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";
import IconButton from "../components/IconButton";


export default function Header({ onLogout, showBackButton = false }) {
  const navigate = useNavigate();
  // 1. Busca a string do localStorage
  const userData = localStorage.getItem('@App:user');
  
  // 2. Converte de volta para objeto (ou cria um fallback se estiver vazio)
  const usuario = userData ? JSON.parse(userData) : null;

  // 3. Garante que vai achar o nome, seja do Postgres como 'nome' ou 'name'
  const nomeExibicao = usuario?.nome || usuario?.name || "Estudante";

  return (
    <header className="home-header">
      {/* Bloco da Esquerda: Seta condicional + Mensagem */}
      <div className="header-left-side" >
        
        {/* Se a prop showBackButton for verdadeira, renderiza seu IconButton reaproveitado */}
        {showBackButton && (
          <IconButton 
            icon={IoMdReturnLeft} 
            onClick={() => navigate(-1)} 
            // Sem passar a prop 'titulo', seu componente ativa automaticamente o styles.isIconOnly!
          />
        )}
        <div className="header-info">
          <span>Bem-vindo, <strong>{nomeExibicao}</strong>!</span>
        </div>
      </div>
      
      <div style={{ width: '120px' }}>
        <Button onClick={onLogout} type="button">
          Sair
        </Button>
      </div>
    </header>
  );
}