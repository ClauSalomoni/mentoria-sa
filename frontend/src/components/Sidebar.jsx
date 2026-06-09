import { useNavigate } from 'react-router-dom';
import robo from '../assets/robo.jpg'
import { IoHomeSharp } from "react-icons/io5";
import IconButton from '../components/IconButton';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <div className="logo-area">
        <img src={robo} alt="MentorIA" className="app-logo" />
      </div>
      <nav>
        <ul>
          <li>
            <IconButton 
              titulo="Início" 
              icon={IoHomeSharp} 
              onClick={() => navigate('/home')} 
            />
          </li>
          <li>Meus Planos</li>
          <li>Configurações</li>
        </ul>
      </nav>
    </aside>
  );
}