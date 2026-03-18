import React, { useState } from 'react';
import './AdminPanel.css';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import UsuariosPanel from './UsuariosPanel';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="tab-content fade-in">
                        <h1>Dashboard</h1>
                        <p>Resumen general del sistema y estadísticas principales.</p>
                        <div className="stats-grid">
                            <div className="stat-card"><h3>Ingresos</h3><p>$12,500</p></div>
                            <div className="stat-card"><h3>Órdenes</h3><p>150</p></div>
                            <div className="stat-card"><h3>Clientes</h3><p>320</p></div>
                        </div>
                    </div>
                );
            case 'users':
                return <UsuariosPanel />;
            case 'products':
                return (
                    <div className="tab-content fade-in">
                        <h1>Habitaciones</h1>
                        <p>Añada, edite o elimine habitaciones del hotel.</p>
                    </div>
                );
            case 'orders':
                return (
                    <div className="tab-content fade-in">
                        <h1>Reservaciones</h1>
                        <p>Revise el estado de las reservaciones y cuentas por cobrar.</p>
                    </div>
                );
            case 'settings':
                return (
                    <div className="tab-content fade-in">
                        <h1>Configuración</h1>
                        <p>Ajustes generales del hotel.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-panel">
            <NavbarAdmin toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="admin-container">
                <aside className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
                    <div className="sidebar-header">
                        <h2>Admin Raíces del Golfo</h2>
                    </div>
                    <ul className="sidebar-menu">
                        <li>
                            <button 
                                className={`sidebar-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button 
                                className={`sidebar-btn ${activeTab === 'users' ? 'active' : ''}`}
                                onClick={() => setActiveTab('users')}
                            >
                                Usuarios
                            </button>
                        </li>
                        <li>
                            <button 
                                className={`sidebar-btn ${activeTab === 'products' ? 'active' : ''}`}
                                onClick={() => setActiveTab('products')}
                            >
                                Habitaciones
                            </button>
                        </li>
                        <li>
                            <button 
                                className={`sidebar-btn ${activeTab === 'orders' ? 'active' : ''}`}
                                onClick={() => setActiveTab('orders')}
                            >
                                Reservaciones
                            </button>
                        </li>
                        <li>
                            <button 
                                className={`sidebar-btn ${activeTab === 'settings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                Configuración
                            </button>
                        </li>
                    </ul>
                </aside>
                <main className="main-content">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default AdminPanel;
