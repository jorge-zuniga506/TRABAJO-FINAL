import React, { useState, useEffect } from 'react';

function ReservasPanel() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const response = await fetch('http://localhost:3007/reservations');
      const data = await response.json();
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
      const updatedReserva = { ...reservaToUpdate, status: newStatus };

      const response = await fetch(`http://localhost:3007/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReserva)
      });

      if (response.ok) {
        setReservas(reservas.map(r => r.id === id ? updatedReserva : r));
        alert(`Reserva ${newStatus.toLowerCase()} con éxito`);
      }
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

      <style jsx>{`
        .panel-header {
          margin-bottom: 30px;
        }
        
        .panel-header h1 {
          font-size: 2rem;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .admin-table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          background-color: #f8fafc;
          padding: 16px 20px;
          color: #64748b;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .admin-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
        }

        .client-cell {
          display: flex;
          flex-direction: column;
        }

        .user-id {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .status-badge.pendiente { background: #fef3c7; color: #92400e; }
        .status-badge.aprobada { background: #dcfce7; color: #166534; }
        .status-badge.denegada { background: #fee2e2; color: #991b1b; }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .btn-approve, .btn-deny {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s;
        }

        .btn-approve {
          background: #0d9488;
          color: white;
        }

        .btn-approve:hover { background: #0f766e; }

        .btn-deny {
          background: #ef4444;
          color: white;
        }

        .btn-deny:hover { background: #dc2626; }

        .action-complete {
          font-size: 0.85rem;
          color: #94a3b8;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

export default ReservasPanel;
