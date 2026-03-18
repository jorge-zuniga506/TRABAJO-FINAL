import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavbarAdmin.css';

function NavbarAdmin({ toggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link to="/admin" className="logo-admin-text">
            Raíces del Golfo <span className="admin-badge">Admin</span>
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
           <Link to="/" className="btn-logout">
             Salir
           </Link>

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
