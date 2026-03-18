import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarCliente from './NavbarCliente';
import './ClientePag.css';

// Importar imágenes de tours para el catálogo
import posada1 from '../TOURS/img toures/posada1.jpg';
import posada2 from '../TOURS/img toures/posada2.jpg';
import posada3 from '../TOURS/img toures/posada3.jpg';
import posada4 from '../TOURS/img toures/posada4.jpg';
import isla1 from '../TOURS/img toures/isla1.jpg';
import isla2 from '../TOURS/img toures/isla2.jpg';
import isla3 from '../TOURS/img toures/isla3.jpg';
import isla4 from '../TOURS/img toures/isla4.jpg';
import isla5 from '../TOURS/img toures/isla5.jpg';

const TOUR_DATA = [
  { id: 'p1', nombre: 'Tour de pesca artesanal', imagen: posada1, precio: '$15 USD', descripcion: 'Experiencia con pescadores locales donde se aprenden técnicas tradicionales.' },
  { id: 'p2', nombre: 'Taller de artesanías', imagen: posada2, precio: '$10 USD', descripcion: 'Taller para crear artesanías locales con materiales de la zona.' },
  { id: 'p3', nombre: 'Avistamiento de aves marinas', imagen: posada3, precio: '$12 - $16 USD', descripcion: 'Tour guiado para observar aves en la isla y alrededores.' },
  { id: 'p4', nombre: 'Recorrido por los manglares', imagen: posada4, precio: '$12 - $16 USD', descripcion: 'Paseo en bote por manglares con guía local.' },
  { id: 'i1', nombre: 'Tour de pesca artesanal Isla', imagen: isla1, precio: '$15 – $25 USD', descripcion: 'Experiencia con pescadores locales y técnicas tradicionales en la isla.' },
  { id: 'i2', nombre: 'Tour en bote por el Golfo', imagen: isla2, precio: '$20 – $40 USD', descripcion: 'Paseos en lancha visitando otras islas cercanas del Golfo de Nicoya.' },
  { id: 'i3', nombre: 'Kayak y actividades acuáticas', imagen: isla3, precio: '$10 – $25 USD', descripcion: 'Recorridos en kayak y exploración del mar a tu propio ritmo.' },
  { id: 'i4', nombre: 'Senderismo y tours ecológicos', imagen: isla4, precio: '$10 – $20 USD', descripcion: 'Caminatas guiadas por la isla disfrutando de la naturaleza local.' },
  { id: 'i5', nombre: 'Experiencias de bienestar', imagen: isla5, precio: '$10 – $25 USD', descripcion: 'Actividades como yoga, meditación y relajación frente al mar.' },
];

function ClientePag() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('inicio');
  const [userName, setUserName] = useState('Cliente');
  const [reservas, setReservas] = useState([]);
  
  // Estado para el formulario de nueva reserva
  const [newReserva, setNewReserva] = useState({
    tour: '',
    fecha: '',
    horario: ''
  });

  useEffect(() => {
    // Verificar si venimos desde un botón de "Reservar" en un Tour
    if (location.state && location.state.tab) {
        setActiveTab(location.state.tab);
        if (location.state.selectedTour) {
            setNewReserva(prev => ({ ...prev, tour: location.state.selectedTour }));
        }
    }

    const fetchReservas = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3007/reservations?userId=${userId}`);
            const data = await response.json();
            setReservas(data);
        } catch (error) {
            console.error("Error al cargar reservas", error);
        }
    };
    // Intentar obtener el nombre del usuario desde localStorage si existe
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.name) setUserName(user.name);
        if (user.id) fetchReservas(user.id);
      } catch (e) {
        console.error("Error al leer usuario", e);
      }
    }
  }, [location.state]);

  const handleCreateReserva = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!newReserva.tour || !newReserva.fecha || !newReserva.horario) {
        alert("Por favor completa todos los campos");
        return;
    }

    const reservaData = {
        userId: storedUser.id,
        userName: storedUser.name || storedUser.email,
        tourName: newReserva.tour,
        date: newReserva.fecha,
        time: newReserva.horario,
        status: 'Pendiente',
        createdAt: new Date().toISOString()
    };

    try {
        const response = await fetch('http://localhost:3007/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservaData)
        });

        if (response.ok) {
            const added = await response.json();
            setReservas([...reservas, added]);
            setNewReserva({ tour: '', fecha: '', horario: '' });
            alert("¡Solicitud de reserva enviada con éxito!");
        }
    } catch (error) {
        alert("Error al enviar la reserva");
    }
  };

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
        const selectedTourInfo = TOUR_DATA.find(t => t.nombre === newReserva.tour);
        const horariosDisponibles = ["08:00 AM", "10:00 AM", "01:00 PM", "03:00 PM"];

        return (
          <div className="cliente-tab-content fade-in">
            <div className="reservas-layout-new">
              {/* Sección Superior: Solicitud con Previsualización */}
              <section className="booking-section">
                <div className="section-header-flex">
                  <h2>Solicitar Nueva Reserva</h2>
                  <p>Selecciona un tour para ver sus detalles antes de reservar.</p>
                </div>

                <div className="booking-container-flex">
                  <div className="booking-form-wrapper">
                    <form className="reserva-form-compact" onSubmit={handleCreateReserva}>
                      {/* Selector de Tour Visual (Horizontal Scroll) */}
                      <div className="form-group">
                        <label>1. Selecciona tu aventura:</label>
                        <div className="tour-selection-mini">
                          {TOUR_DATA.map(t => (
                            <div 
                              key={t.id} 
                              className={`tour-mini-option ${newReserva.tour === t.nombre ? 'selected' : ''}`}
                              onClick={() => setNewReserva({...newReserva, tour: t.nombre})}
                            >
                              <div className="mini-img"><img src={t.imagen} alt={t.nombre} /></div>
                              <span className="mini-name">{t.nombre}</span>
                              {newReserva.tour === t.nombre && <div className="mini-check">✓</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="form-row-vertical">
                        <div className="form-group">
                          <label>2. ¿Cuándo vienes?</label>
                          <input 
                              type="date" 
                              className="input-custom-style"
                              min={new Date().toISOString().split('T')[0]}
                              value={newReserva.fecha}
                              onChange={(e) => setNewReserva({...newReserva, fecha: e.target.value})}
                              required
                          />
                        </div>

                        <div className="form-group">
                          <label>3. Elige el horario:</label>
                          <div className="time-slots-grid">
                            {horariosDisponibles.map(h => (
                              <div 
                                key={h} 
                                className={`time-slot ${newReserva.horario === h ? 'selected' : ''}`}
                                onClick={() => setNewReserva({...newReserva, horario: h})}
                              >
                                {h}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button type="submit" className={`btn-booking-modern ${newReserva.tour && newReserva.fecha && newReserva.horario ? 'ready' : ''}`}>
                        <span>RESERVAR AHORA</span>
                        <div className="btn-shine"></div>
                      </button>
                    </form>
                  </div>

                  {/* Previsualización del Tour seleccionado */}
                  <div className={`tour-preview-card ${selectedTourInfo ? 'active' : 'inactive'}`}>
                    {selectedTourInfo ? (
                      <>
                        <div className="preview-image-container">
                          <img src={selectedTourInfo.imagen} alt={selectedTourInfo.nombre} />
                          <div className="preview-price-badge">{selectedTourInfo.precio}</div>
                        </div>
                        <div className="preview-info">
                          <h3>{selectedTourInfo.nombre}</h3>
                          <p>{selectedTourInfo.descripcion}</p>
                        </div>
                      </>
                    ) : (
                      <div className="preview-placeholder">
                        <div className="placeholder-icon">📷</div>
                        <p>Selecciona un tour para ver la información aquí.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Historial de Reservas como Tarjetas */}
              <section className="history-section-visual">
                <div className="section-header-flex">
                  <h2>Mi Historial de Reservas</h2>
                  <p>Consulta el estado de tus aventuras solicitadas.</p>
                </div>

                {reservas.length === 0 ? (
                  <div className="empty-state-visual">
                    <div className="empty-icon">🌊</div>
                    <p>Aún no tienes ninguna aventura en tu historial.</p>
                  </div>
                ) : (
                  <div className="reservation-cards-grid">
                    {reservas.slice().reverse().map((res) => {
                      const tourInfo = TOUR_DATA.find(t => t.nombre === res.tourName);
                      return (
                        <div className="reserva-card-item" key={res.id}>
                          <div className="reserva-card-img">
                            <img src={tourInfo ? tourInfo.imagen : ''} alt={res.tourName} />
                            <span className={`reserva-status-tag ${res.status.toLowerCase()}`}>
                              {res.status}
                            </span>
                          </div>
                          <div className="reserva-card-body">
                            <h3>{res.tourName}</h3>
                            <div className="reserva-meta">
                              <span>📅 {res.date}</span>
                              <span>⏰ {res.time}</span>
                            </div>
                            {tourInfo && <p className="reserva-desc-short">{tourInfo.descripcion.substring(0, 60)}...</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
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
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        return (
          <div className="cliente-tab-content fade-in">
            <h2>Mi Perfil</h2>
            <div className="profile-details-card">
              <div className="profile-header-info">
                <div className="avatar-large">{userName.substring(0, 2).toUpperCase()}</div>
                <div>
                  <h3>{userName}</h3>
                  <p>Miembro de Raíces del Golfo</p>
                </div>
              </div>
              <div className="details-list">
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{storedUser.email || 'No disponible'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Rol:</span>
                  <span className="detail-value">{storedUser.role || 'Cliente'}</span>
                </div>
              </div>
              <button className="btn-edit" onClick={() => alert('Próximamente: Edición de perfil')}>Editar Perfil</button>
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
