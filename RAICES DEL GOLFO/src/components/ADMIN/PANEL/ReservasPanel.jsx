import React, { useState, useEffect } from 'react';
import { getAllReservas, updateReserva } from '../../../services/CrudReservas';
import { getAllRoomReservas, updateRoomReserva } from '../../../services/CrudReservasHabitaciones';
import './ReservasPanel.css';

function ReservasPanel() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const [toursData, roomsData] = await Promise.all([
        getAllReservas(),
        getAllRoomReservas()
      ]);

      // Etiquetar cada reserva con su tipo para diferenciar en la UI
      const tours = toursData.map(r => ({ ...r, tipo: 'Tour', item: r.tourName }));
      const rooms = roomsData.map(r => ({ ...r, tipo: 'Habitación', item: r.roomName, date: `${r.checkIn} al ${r.checkOut}` }));

      const allData = [...tours, ...rooms];

      // Ordenar por fecha de creación (más recientes primero)
      allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setReservas(allData);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando todas las reservas", error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus, tipo) => {
    try {
      const reservaToUpdate = reservas.find(r => r.id === id);
      const updatedData = { ...reservaToUpdate, status: newStatus };

      if (tipo === 'Habitación') {
        await updateRoomReserva(id, updatedData);
      } else {
        await updateReserva(id, updatedData);
      }

      setReservas(reservas.map(r => r.id === id ? updatedData : r));
      alert(`Reserva ${newStatus.toLowerCase()} con éxito`);
    } catch (error) {
      alert("Error al actualizar la reserva");
    }
  };

  if (loading) return <div className="loading">Cargando reservaciones...</div>;

  return (
    <div className="tab-content fade-in">
      <div className="panel-header">
        <h1>Gestión de Reservaciones</h1>
        <p>Revisa y aprueba las solicitudes de los clientes.</p>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Servicio / Habitación</th>
              <th>Fecha / Estancia</th>
              <th>Horario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                  No hay solicitudes de reserva en este momento.
                </td>
              </tr>
            ) : (
              reservas.map((res) => (
                <tr key={res.id}>
                  <td>
                    <div className="client-cell">
                      <strong>{res.userName}</strong>
                      <span className="user-id">ID: {res.userId}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge-tipo ${res.tipo === 'Tour' ? 'tour' : 'room'}`}>
                      {res.tipo}
                    </span>
                  </td>
                  <td>{res.item}</td>
                  <td>{res.date}</td>
                  <td>{res.time || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${res.status.toLowerCase()}`}>
                      {res.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {res.status === 'Pendiente' ? (
                        <>
                          <button
                            className="btn-approve"
                            onClick={() => handleStatusUpdate(res.id, 'Aprobada', res.tipo)}
                            title="Aprobar"
                          >
                            ✓
                          </button>
                          <button
                            className="btn-deny"
                            onClick={() => handleStatusUpdate(res.id, 'Denegada', res.tipo)}
                            title="Denegar"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <span className="action-complete">Procesada</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReservasPanel;
