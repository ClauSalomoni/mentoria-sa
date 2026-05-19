export default function Header({ onLogout }) {
  return (
    <header className="home-header">
      <div className="header-info">
        <span>Bem-vindo, Estudante!</span>
      </div>
      <button className="btn-sair" onClick={onLogout}>Sair</button>
    </header>
  );
}