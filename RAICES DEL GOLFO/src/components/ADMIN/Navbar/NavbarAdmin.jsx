import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SharkLogo from '../../common/SharkLogo';
import './NavbarAdmin.css';

function NavbarAdmin({ toggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar-admin">
      <div className="navbar-admin-container">
        <div className="navbar-admin-logo">
          <button className="sidebar-toggle-btn" onClick={toggleSidebar} title="Alternar panel lateral">
            <div className="hamburger">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </button>
          <Link to="/admin">
            <SharkLogo color="#0d9488" suffix="Admin" />
          </Link>
        </div>

        {/* Acciones de navegación a la derecha */}
        <div className="navbar-admin-actions">
           {/* Notificaciones */}
           <button className="icon-btn" aria-label="Notificaciones">
             <i className="icon-bell">&#128276;</i>
             <span className="notification-badge">3</span>
           </button>
           
           {/* Perfil del Usuario */}
           <div className="admin-profile">
             <div className="avatar">AD</div>
             <span className="admin-name">Administrador</span>
           </div>

           {/* Botón Salir */}
           <button onClick={handleLogout} className="btn-logout">
             Salir
           </button>

           {/* Mobile menu icon */}
           <div className="menu-icon-admin" onClick={() => setMenuOpen(!menuOpen)}>
             <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
             <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
             <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
           </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
