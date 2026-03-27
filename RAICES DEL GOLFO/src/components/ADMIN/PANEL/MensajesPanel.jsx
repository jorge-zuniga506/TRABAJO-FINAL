import React, { useState, useEffect } from 'react';
import { ENDPOINTS } from '../../../config/api';
import './ReservasPanel.css'; // Reutilizamos estilos de tablas de administración

function MensajesPanel() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await fetch(ENDPOINTS.CONTACTOS);
            const data = await response.json();
            // Ordenar por ID o fecha si existe (simulado por ID inverso aquí)
            setMessages(data.reverse());
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este mensaje?')) return;
        
        try {
            await fetch(`${ENDPOINTS.CONTACTOS}/${id}`, { method: 'DELETE' });
            setMessages(messages.filter(m => m.id !== id));
        } catch (error) {
            alert('Error al eliminar el mensaje');
        }
    };

    if (loading) return <div className="loading">Cargando mensajes...</div>;

    return (
        <div className="tab-content fade-in">
            <div className="panel-header">
                <h1>Mensajes de Contacto</h1>
                <p>Gestiona las consultas recibidas a través del formulario de contacto.</p>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Asunto / Mensaje</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                                    No hay mensajes de contacto en este momento.
                                </td>
                            </tr>
                        ) : (
                            messages.map((msg) => (
                                <tr key={msg.id}>
                                    <td><strong>{msg.nombre}</strong></td>
                                    <td>{msg.email}</td>
                                    <td>
                                        <div className="msg-content">
                                            {msg.mensaje}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="btn-deny" 
                                                onClick={() => handleDelete(msg.id)}
                                                title="Eliminar mensaje"
                                            >
                                                ✕
                                            </button>
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

export default MensajesPanel;
