import Button from "./Button";

export default function Header({ onLogout }) {
  // 1. Busca a string do localStorage
  const userData = localStorage.getItem('@App:user');
  
  // 2. Converte de volta para objeto (ou cria um fallback se estiver vazio)
  const usuario = userData ? JSON.parse(userData) : null;

  // 3. Garante que vai achar o nome, seja do Postgres como 'nome' ou 'name'
  const nomeExibicao = usuario?.nome || usuario?.name || "Estudante";

  return (
    <header className="home-header">
      <div className="header-info">
        <span>Bem-vindo, <strong>{nomeExibicao}</strong>!</span>
      </div>
      
      <div style={{ width: '120px' }}>
        <Button onClick={onLogout} type="button">
          Sair
        </Button>
      </div>
    </header>
  );
}