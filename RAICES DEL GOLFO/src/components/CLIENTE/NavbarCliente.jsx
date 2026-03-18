import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarCliente.css';

function NavbarCliente() {
  return (
    <nav className="navbar-cliente">
      <div className="navbar-cliente-container">
        <div className="navbar-cliente-logo">
          <Link to="/" className="logo-cliente-text">
            Raíces del Golfo <span className="cliente-badge">Cliente</span>
          </Link>
        </div>

        <div className="navbar-cliente-actions">
           {/* Perfil del Usuario */}
           <div className="cliente-profile">
             <div className="avatar">CL</div>
             <span className="cliente-name">Cliente</span>
           </div>

           {/* Botón Salir */}
           <Link to="/" className="btn-logout">
             Salir
           </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarCliente;
