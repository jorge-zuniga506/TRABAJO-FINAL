import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarCliente from './NavbarCliente';
import Opiniones from '../INICIO/OPINIONES/Opiniones';
import { getTours } from '../../services/CrudTours';
import { getReservasByUser, createReserva } from '../../services/CrudReservas';
import { getRoomReservasByUser, createRoomReserva } from '../../services/CrudReservasHabitaciones';
import { updateUserProfile } from '../../services/CrudParaUsuarios';
import { getHabitaciones } from '../../services/CrudHabitaciones';
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

const IMAGES_MAP = {
  't001': posada1, 't002': posada2, 't003': posada3, 't004': posada4,
  't005': isla1, 't006': isla2, 't007': isla3, 't008': isla4, 't009': isla5,
};

function ClientePag() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('inicio');
  const [userName, setUserName] = useState('Cliente');
  const [reservas, setReservas] = useState([]);
  const [reservasHab, setReservasHab] = useState([]);
  const [allTours, setAllTours] = useState([]);
  const [allHabitaciones, setAllHabitaciones] = useState([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingHab, setLoadingHab] = useState(true);

  // Estado para el formulario de nueva reserva de tour
  const [newReserva, setNewReserva] = useState({
    tour: '',
    fecha: '',
    horario: ''
  });

  // Estado para el formulario de nueva reserva de habitación
  const [newRoomReserva, setNewRoomReserva] = useState({
    roomId: '',
    roomName: '',
    checkIn: '',
    checkOut: '',
    time: '12:00 PM',
    price: 0
  });

  // Estados para edición de perfil
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: '',
    photo: ''
  });

  useEffect(() => {
    // Verificar si venimos desde un botón de "Reservar" en un Tour
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
      if (location.state.selectedTour) {
        setNewReserva(prev => ({ ...prev, tour: location.state.selectedTour }));
      }
    }

    const fetchData = async () => {
      try {
        setLoadingTours(true);
        setLoadingHab(true);

        const [toursRes, habRes] = await Promise.all([
          getTours(),
          getHabitaciones()
        ]);

        setAllTours(toursRes.filter(t => t.disponible));
        setAllHabitaciones(habRes);

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.name) setUserName(user.name);
          if (user.id) {
            const [resTours, resHab] = await Promise.all([
              getReservasByUser(user.id),
              getRoomReservasByUser(user.id)
            ]);
            setReservas(resTours);
            setReservasHab(resHab);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingTours(false);
        setLoadingHab(false);
      }
    };

    fetchData();
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
      const added = await createReserva(reservaData);
      setReservas([...reservas, added]);
      setNewReserva({ tour: '', fecha: '', horario: '' });
      alert("¡Solicitud de reserva enviada con éxito!");
    } catch (error) {
      alert("Error al enviar la reserva");
    }
  };

  const handleCreateRoomReserva = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (!newRoomReserva.roomId || !newRoomReserva.checkIn || !newRoomReserva.checkOut) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const reservaData = {
      userId: storedUser.id,
      userName: storedUser.name || storedUser.email,
      roomId: newRoomReserva.roomId,
      roomName: newRoomReserva.roomName,
      checkIn: newRoomReserva.checkIn,
      checkOut: newRoomReserva.checkOut,
      time: newRoomReserva.time,
      price: newRoomReserva.price,
      status: 'Pendiente',
      createdAt: new Date().toISOString()
    };

    try {
      const added = await createRoomReserva(reservaData);
      setReservasHab([...reservasHab, added]);
      setNewRoomReserva({ roomId: '', roomName: '', checkIn: '', checkOut: '', time: '12:00 PM', price: 0 });
      alert("¡Solicitud de reserva de habitación enviada con éxito!");
    } catch (error) {
      alert("Error al enviar la reserva de habitación");
    }
  };

  const calculateTotalPrice = (roomId, checkIn, checkOut) => {
    const room = allHabitaciones.find(h => h.id === roomId);
    if (room && checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (nights > 0) {
        return room.precio * nights;
      }
    }
    return 0;
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
                  <p>{reservasHab.length > 0 ? reservasHab[reservasHab.length - 1].checkIn : 'Aún sin reservas'}</p>
                </div>
              </div>
              <div className="client-stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>Puntos de Canjeo</h3>
                  <p>150 pts</p>
                </div>
              </div>
              <div className="client-stat-card">
                <div className="stat-icon">⛵</div>
                <div className="stat-info">
                  <h3>Tours Hechos</h3>
                  <p>{reservas.length}</p>
                </div>
              </div>
            </div>

            <section className="quick-actions">
              <h2>¿Qué te gustaría hacer hoy?</h2>
              <div className="actions-grid">
                <button className="action-card" onClick={() => setActiveTab('reservas')}>
                  <span className="action-emoji">🛶</span>
                  <span>Explorar Tours</span>
                </button>
                <button className="action-card" onClick={() => setActiveTab('hospedajes')}>
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
        const selectedTourInfo = allTours.find(t => t.nombre === newReserva.tour);
        const horariosDisponibles = ["08:00 AM", "10:00 AM", "01:00 PM", "03:00 PM"];

        return (
          <div className="cliente-tab-content fade-in">
            <div className="reservas-layout-new">
              <section className="booking-section">
                <div className="section-header-flex">
                  <h2>Solicitar Nueva Reserva</h2>
                  <p>Selecciona un tour para ver sus detalles antes de reservar.</p>
                </div>

                <div className="booking-container-flex">
                  <div className="booking-form-wrapper">
                    <form className="reserva-form-compact" onSubmit={handleCreateReserva}>
                      <div className="form-group">
                        <label>1. Selecciona tu aventura:</label>
                        <div className="tour-selection-mini">
                          {loadingTours ? (
                            <p>Cargando tours...</p>
                          ) : (
                            allTours.map(t => (
                              <div
                                key={t.id}
                                className={`tour-mini-option ${newReserva.tour === t.nombre ? 'selected' : ''}`}
                                onClick={() => setNewReserva({ ...newReserva, tour: t.nombre })}
                              >
                                <div className="mini-img"><img src={t.imagen || IMAGES_MAP[t.id] || posada1} alt={t.nombre} /></div>
                                <span className="mini-name">{t.nombre}</span>
                                {newReserva.tour === t.nombre && <div className="mini-check">✓</div>}
                              </div>
                            ))
                          )}
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
                            onChange={(e) => setNewReserva({ ...newReserva, fecha: e.target.value })}
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
                                onClick={() => setNewReserva({ ...newReserva, horario: h })}
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

                  <div className={`tour-preview-card ${selectedTourInfo ? 'active' : 'inactive'}`}>
                    {selectedTourInfo ? (
                      <>
                        <div className="preview-image-container">
                          <img src={selectedTourInfo.imagen || IMAGES_MAP[selectedTourInfo.id] || posada1} alt={selectedTourInfo.nombre} />
                          <div className="preview-price-badge">${selectedTourInfo.precio} USD</div>
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
                      const tourInfo = allTours.find(t => t.nombre === res.tourName);
                      return (
                        <div className="reserva-card-item" key={res.id}>
                          <div className="reserva-card-img">
                            <img src={tourInfo ? (tourInfo.imagen || IMAGES_MAP[tourInfo.id] || posada1) : posada1} alt={res.tourName} />
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
      case 'hospedajes':
        const selectedRoomInfo = allHabitaciones.find(h => h.id === newRoomReserva.roomId);
        const IMAGENES_DEFECTO = [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
          "https://images.unsplash.com/photo-1521783988139-89397d761dce?w=600&q=80"
        ];

        return (
          <div className="cliente-tab-content fade-in">
            <div className="reservas-layout-new">
              {/* Nueva sección: Formulario de Reserva de Habitación */}
              <section className="booking-section">
                <div className="section-header-flex">
                  <h2>Reservar Habitación</h2>
                  <p>Selecciona tu habitación ideal y las fechas de tu estancia.</p>
                </div>

                <div className="booking-container-flex">
                  <div className="booking-form-wrapper">
                    <form className="reserva-form-compact" onSubmit={handleCreateRoomReserva}>
                      <div className="form-group">
                        <label>1. Elige tu habitación:</label>
                        <div className="tour-selection-mini">
                          {loadingHab ? (
                            <p>Cargando habitaciones...</p>
                          ) : (
                            allHabitaciones.map(h => (
                              <div
                                key={h.id}
                                className={`tour-mini-option ${newRoomReserva.roomId === h.id ? 'selected' : ''}`}
                                onClick={() => {
                                  const totalPrice = calculateTotalPrice(h.id, newRoomReserva.checkIn, newRoomReserva.checkOut);
                                  setNewRoomReserva({ ...newRoomReserva, roomId: h.id, roomName: h.nombre, price: totalPrice });
                                }}
                              >
                                <div className="mini-img"><img src={h.imagen || IMAGENES_DEFECTO[0]} alt={h.nombre} /></div>
                                <span className="mini-name">{h.nombre}</span>
                                {newRoomReserva.roomId === h.id && <div className="mini-check">✓</div>}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="form-row-vertical">
                        <div className="form-group">
                          <label>2. Fecha de Entrada (Check-in):</label>
                          <input
                            type="date"
                            className="input-custom-style"
                            min={new Date().toISOString().split('T')[0]}
                            value={newRoomReserva.checkIn}
                            onChange={(e) => {
                              const totalPrice = calculateTotalPrice(newRoomReserva.roomId, e.target.value, newRoomReserva.checkOut);
                              setNewRoomReserva({ ...newRoomReserva, checkIn: e.target.value, price: totalPrice });
                            }}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>3. Fecha de Salida (Check-out):</label>
                          <input
                            type="date"
                            className="input-custom-style"
                            min={newRoomReserva.checkIn || new Date().toISOString().split('T')[0]}
                            value={newRoomReserva.checkOut}
                            onChange={(e) => {
                              const totalPrice = calculateTotalPrice(newRoomReserva.roomId, newRoomReserva.checkIn, e.target.value);
                              setNewRoomReserva({ ...newRoomReserva, checkOut: e.target.value, price: totalPrice });
                            }}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>4. Hora de llegada aproximada:</label>
                          <input
                            type="time"
                            className="input-custom-style"
                            value={newRoomReserva.time}
                            onChange={(e) => setNewRoomReserva({ ...newRoomReserva, time: e.target.value })}
                          />
                        </div>
                      </div>

                      {newRoomReserva.price > 0 && (
                        <div className="price-preview-total">
                          <span>Total Estimado:</span>
                          <strong>${newRoomReserva.price} USD</strong>
                        </div>
                      )}

                      <button type="submit" className={`btn-booking-modern ${newRoomReserva.roomId && newRoomReserva.checkIn && newRoomReserva.checkOut ? 'ready' : ''}`}>
                        <span>SOLICITAR RESERVA</span>
                        <div className="btn-shine"></div>
                      </button>
                    </form>
                  </div>

                  <div className={`tour-preview-card ${selectedRoomInfo ? 'active' : 'inactive'}`}>
                    {selectedRoomInfo ? (
                      <>
                        <div className="preview-image-container">
                          <img src={selectedRoomInfo.imagen || IMAGENES_DEFECTO[0]} alt={selectedRoomInfo.nombre} />
                          <div className="preview-price-badge">${selectedRoomInfo.precio} / noche</div>
                        </div>
                        <div className="preview-info">
                          <h3>{selectedRoomInfo.nombre}</h3>
                          <p><strong>Capacidad:</strong> {selectedRoomInfo.capacidad} personas</p>
                          <p>{selectedRoomInfo.descripcion}</p>
                        </div>
                      </>
                    ) : (
                      <div className="preview-placeholder">
                        <div className="placeholder-icon">🛏️</div>
                        <p>Selecciona una habitación para ver los detalles.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Historial de Reservas */}
              <section className="history-section-visual">
                <div className="section-header-flex">
                  <h2>Mis Reservas de Habitaciones</h2>
                  <p>Consulta el estado de tus estancias solicitadas.</p>
                </div>

                {reservasHab.length === 0 ? (
                  <div className="empty-state-visual">
                    <div className="empty-icon">🏠</div>
                    <p>Aún no tienes ninguna reserva de habitación en tu historial.</p>
                  </div>
                ) : (
                  <div className="reservation-cards-grid">
                    {reservasHab.slice().reverse().map((res) => {
                      const roomInfo = allHabitaciones.find(h => h.id === res.roomId || h.nombre === res.roomName);
                      return (
                        <div className="reserva-card-item" key={res.id}>
                          <div className="reserva-card-img">
                            <img
                              src={roomInfo?.imagen || IMAGENES_DEFECTO[0]}
                              alt={res.roomName}
                              onError={e => { e.target.src = IMAGENES_DEFECTO[0]; }}
                            />
                            <span className={`reserva-status-tag ${res.status.toLowerCase()}`}>
                              {res.status}
                            </span>
                          </div>
                          <div className="reserva-card-body">
                            <h3>{res.roomName}</h3>
                            <div className="reserva-meta">
                              <span>📅 {res.checkIn} al {res.checkOut}</span>
                              <span style={{ fontWeight: '700', color: '#0d9488' }}>💰 ${res.price} USD</span>
                            </div>
                            {res.time && <div className="small-text" style={{ marginTop: '5px' }}>⏰ LLegada: {res.time}</div>}
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
            <Opiniones />
          </div>
        );
      case 'perfil':
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        const handleStartEditing = () => {
          setEditedUser({
            name: userName,
            photo: currentUser.photo || ''
          });
          setIsEditing(true);
        };

        const handleSaveProfile = async () => {
          try {
            const updated = await updateUserProfile(currentUser.id, editedUser);
            
            // Actualizar localStorage
            const newUser = { ...currentUser, ...updated };
            localStorage.setItem('user', JSON.stringify(newUser));
            
            // Actualizar estados locales
            setUserName(updated.name || userName);
            setIsEditing(false);
            alert('Perfil actualizado con éxito');
          } catch (error) {
            alert('Error al actualizar el perfil');
          }
        };

        return (
          <div className="cliente-tab-content fade-in">
            <h2>Mi Perfil</h2>
            <div className="profile-details-card">
              <div className="profile-header-info">
                {isEditing ? (
                  <div className="avatar-edit-container">
                    <div className="avatar-large">
                      {editedUser.photo ? (
                        <img src={editedUser.photo} alt="Profile" className="avatar-img" />
                      ) : (
                        editedUser.name.substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div className="input-group-modern">
                      <label>URL de Foto de Perfil:</label>
                      <input 
                        type="text" 
                        value={editedUser.photo} 
                        onChange={(e) => setEditedUser({...editedUser, photo: e.target.value})}
                        placeholder="https://ejemplo.com/foto.jpg"
                        className="input-custom-style"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="avatar-large">
                      {currentUser.photo ? (
                        <img src={currentUser.photo} alt="Profile" className="avatar-img" />
                      ) : (
                        userName.substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h3>{userName}</h3>
                      <p>Cliente de Raíces del Golfo</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="details-list">
                <div className="detail-item">
                  <span className="detail-label">Nombre:</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editedUser.name} 
                      onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                      className="input-custom-style"
                    />
                  ) : (
                    <span className="detail-value">{userName}</span>
                  )}
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{currentUser.email || 'No disponible'}</span>
                </div>
                {!isEditing && (
                  <div className="detail-item">
                    <span className="detail-label">Rol:</span>
                    <span className="detail-value">{currentUser.role || 'Cliente'}</span>
                  </div>
                )}
              </div>
              
              <div className="profile-actions-footer">
                {isEditing ? (
                  <>
                    <button className="btn-save-modern" onClick={handleSaveProfile}>Guardar Cambios</button>
                    <button className="btn-cancel-modern" onClick={() => setIsEditing(false)}>Cancelar</button>
                  </>
                ) : (
                  <button className="btn-edit" onClick={handleStartEditing}>Editar Perfil</button>
                )}
              </div>
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
                <span className="nav-icon">📋</span> Mis Tours
              </button>
            </li>
            <li>
              <button
                className={`client-nav-btn ${activeTab === 'hospedajes' ? 'active' : ''}`}
                onClick={() => setActiveTab('hospedajes')}
              >
                <span className="nav-icon">🏠</span> Reservas de Habitaciones
              </button>
            </li>
            <li>
              <button
                className={`client-nav-btn ${activeTab === 'servicios' ? 'active' : ''}`}
                onClick={() => setActiveTab('servicios')}
              >
                <span className="nav-icon">⭐</span> Opiniones
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
