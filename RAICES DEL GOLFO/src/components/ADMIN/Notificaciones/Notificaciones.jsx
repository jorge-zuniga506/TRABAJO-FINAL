import React, { useState, useEffect } from 'react';
import './Notificaciones.css';

function Notificaciones({ onTabChange }) {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Polling de notificaciones
    const fetchNotifications = async () => {
      try {
        const [resTours, resRooms, resContacts] = await Promise.all([
          fetch('http://localhost:3007/reservations?status=Pendiente').then(r => r.json()),
          fetch('http://localhost:3007/room_reservations?status=Pendiente').then(r => r.json()),
          fetch('http://localhost:3007/formularioContacto').then(r => r.json())
        ]);

        const allNotifications = [
          ...resTours.map(r => ({ ...r, type: 'tour', label: `Nueva reserva: ${r.tourName}` })),
          ...resRooms.map(r => ({ ...r, type: 'room', label: `Nueva habitación: ${r.roomName}` })),
          ...resContacts.map(r => ({ ...r, type: 'contact', label: `Nuevo mensaje de: ${r.nombre || 'Contacto'}` }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setNotifications(allNotifications);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = (notif) => {
    setShowNotifications(false);
    if (notif.type === 'tour' || notif.type === 'room') {
      onTabChange('orders');
    } else if (notif.type === 'contact') {
      onTabChange('messages');
    }
  };

  return (
    <div className="notifications-wrapper">
      <button 
        className={`icon-btn ${showNotifications ? 'active' : ''}`} 
        aria-label="Notificaciones"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <i className="icon-bell">&#128276;</i>
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </button>

      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="dropdown-header">
            <h3>Notificaciones</h3>
            {notifications.length > 0 && <span className="count-label">{notifications.length} nuevas</span>}
          </div>
          <div className="dropdown-body">
            {notifications.length === 0 ? (
              <div className="empty-notifications">
                <span>🌊</span>
                <p>Sin notificaciones nuevas</p>
              </div>
            ) : (
              notifications.map((notif, index) => (
                <div 
                  key={notif.id || index} 
                  className="notification-item"
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className={`notification-icon ${notif.type}`}>
                    {notif.type === 'tour' ? '🛶' : notif.type === 'room' ? '🛏️' : '✉️'}
                  </div>
                  <div className="notification-info">
                    <p className="notif-label">{notif.label}</p>
                    <span className="notif-time">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notificaciones;
