import React, { useState, useEffect } from 'react';
import NavbarCliente from './NavbarCliente';
import './ClientePag.css';

function ClientePag() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [userName, setUserName] = useState('Cliente');

  useEffect(() => {
    // Intentar obtener el nombre del usuario desde localStorage si existe
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.name) setUserName(user.name);
      } catch (e) {
        console.error("Error al leer usuario", e);
      }
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div className="cliente-tab-content fade-in">
            <header className="welcome-header">
              <h1>¡Hola, {userName}! 👋</h1>
              <p>Bienvenido a tu panel personal de Raíces del Golfo.</p>
            </header>
            
            <div className="client-stats-grid">
              <div className="client-stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <h3>Próximo Viaje</h3>
                  <p>Aún sin reservas</p>
                </div>
              </div>
              <div className="client-stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>Puntos Raíces</h3>
                  <p>150 pts</p>
                </div>
              </div>
              <div className="client-stat-card">
                <div className="stat-icon">⛵</div>
                <div className="stat-info">
                  <h3>Tours Hechos</h3>
                  <p>0</p>
                </div>
              </div>
            </div>

            <section className="quick-actions">
              <h2>¿Qué te gustaría hacer hoy?</h2>
              <div className="actions-grid">
                <button className="action-card" onClick={() => setActiveTab('servicios')}>
                  <span className="action-emoji">🛶</span>
                  <span>Explorar Tours</span>
                </button>
                <button className="action-card" onClick={() => setActiveTab('servicios')}>
                  <span className="action-emoji">🏨</span>
                  <span>Ver Habitaciones</span>
                </button>
                <button className="action-card" onClick={() => setActiveTab('perfil')}>
                  <span className="action-emoji">👤</span>
                  <span>Mi Perfil</span>
                </button>
              </div>
            </section>
          </div>
        );
      case 'reservas':
        return (
          <div className="cliente-tab-content fade-in">
            <h2>Mis Reservaciones</h2>
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>Aún no tienes reservaciones activas.</p>
              <button className="btn-primary" onClick={() => setActiveTab('servicios')}>
                ¡Empieza tu aventura!
              </button>
            </div>
          </div>
        );
      case 'servicios':
        return (
          <div className="cliente-tab-content fade-in">
            <h2>Nuestros Servicios</h2>
            <p>Descubre todo lo que Raíces del Golfo tiene preparado para ti.</p>
            <div className="services-grid">
              <div className="service-promo-card">
                <h3>Tours de Isla</h3>
                <p>Navega y descubre la magia del golfo.</p>
                <button className="btn-outline">Ver más</button>
              </div>
              <div className="service-promo-card">
                <h3>Gastronomía</h3>
                <p>Sabores auténticos de la zona.</p>
                <button className="btn-outline">Ver menú</button>
              </div>
              <div className="service-promo-card">
                <h3>Hospedaje</h3>
                <p>Descanso total frente al mar.</p>
                <button className="btn-outline">Ver disponibilidad</button>
              </div>
            </div>
          </div>
        );
      case 'perfil':
        return (
          <div className="cliente-tab-content fade-in">
            <h2>Mi Perfil</h2>
            <div className="profile-details-card">
              <div className="profile-header-info">
                <div className="avatar-large">{userName.substring(0, 2).toUpperCase()}</div>
                <div>
                  <h3>{userName}</h3>
                  <p>Miembro desde Marzo 2024</p>
                </div>
              </div>
              <div className="details-list">
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">stacy@gmail.com</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Rol:</span>
                  <span className="detail-value">Cliente Preferencial</span>
                </div>
              </div>
              <button className="btn-edit">Editar Perfil</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="cliente-page-layout">
      <NavbarCliente />
      <div className="cliente-container">
        <aside className="cliente-sidebar">
          <ul className="client-nav-list">
            <li>
              <button 
                className={`client-nav-btn ${activeTab === 'inicio' ? 'active' : ''}`}
                onClick={() => setActiveTab('inicio')}
              >
                <span className="nav-icon">🏠</span> Inicio
              </button>
            </li>
            <li>
              <button 
                className={`client-nav-btn ${activeTab === 'reservas' ? 'active' : ''}`}
                onClick={() => setActiveTab('reservas')}
              >
                <span className="nav-icon">📋</span> Mis Reservas
              </button>
            </li>
            <li>
              <button 
                className={`client-nav-btn ${activeTab === 'servicios' ? 'active' : ''}`}
                onClick={() => setActiveTab('servicios')}
              >
                <span className="nav-icon">🌴</span> Servicios
              </button>
            </li>
            <li>
              <button 
                className={`client-nav-btn ${activeTab === 'perfil' ? 'active' : ''}`}
                onClick={() => setActiveTab('perfil')}
              >
                <span className="nav-icon">👤</span> Mi Perfil
              </button>
            </li>
          </ul>
        </aside>

        <main className="cliente-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default ClientePag;
