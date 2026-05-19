import robo from '../assets/robo.jpg'
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-area">
        <img src={robo} alt="MentorIA" className="app-logo" />
      </div>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Meus Planos</li>
          <li>Configurações</li>
        </ul>
      </nav>
    </aside>
  );
}