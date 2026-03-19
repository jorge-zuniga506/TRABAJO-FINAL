import React, { useState, useEffect } from 'react';
import { getAllReservas, updateReserva } from '../../../services/CrudReservas';
import './ReservasPanel.css';

function ReservasPanel() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const data = await getAllReservas();
      // Ordenar por fecha de creación (más recientes primero)
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReservas(data);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando todas las reservas", error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const reservaToUpdate = reservas.find(r => r.id === id);
      const updatedData = { ...reservaToUpdate, status: newStatus };

      await updateReserva(id, updatedData);
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
              <th>Tour</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.length === 0 ? (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '40px'}}>
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
                  <td>{res.tourName}</td>
                  <td>{res.date}</td>
                  <td>{res.time}</td>
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
                            onClick={() => handleStatusUpdate(res.id, 'Aprobada')}
                            title="Aprobar"
                          >
                            ✓
                          </button>
                          <button 
                            className="btn-deny" 
                            onClick={() => handleStatusUpdate(res.id, 'Denegada')}
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
