import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import UsuariosPanel from './UsuariosPanel';
import ReservaHabitaciones from '../HABITACIONES/ResevaHabitaciones';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [stats, setStats] = useState({
        ingresos: 0,
        ordenes: 0,
        clientes: 0
    });
    const [loadingStats, setLoadingStats] = useState(true);

    const fetchDashboardData = async () => {
        try {
            setLoadingStats(true);
            const [usersRes, resRes] = await Promise.all([
                fetch('http://localhost:3007/users'),
                fetch('http://localhost:3007/reservations')
            ]);
            
            const users = await usersRes.json();
            const reservations = await resRes.json();

            // Cálculos Reales
            const clientesCount = users.filter(u => u.role === 'cliente').length;
            const ordenesCount = reservations.length;
            const ingresosTotal = reservations
                .filter(r => r.status === 'Aprobada') // Solo sumamos las aprobadas/pagadas
                .reduce((sum, r) => sum + (Number(r.precio) || 0), 0);

            setStats({
                ingresos: ingresosTotal,
                ordenes: ordenesCount,
                clientes: clientesCount
            });
        } catch (error) {
            console.error("Error cargando estadísticas del dashboard", error);
        } finally {
            setLoadingStats(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'dashboard') {
            fetchDashboardData();
        }
    }, [activeTab]);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="tab-content fade-in">
                        <h1>Dashboard</h1>
                        <p>Resumen general del sistema y estadísticas principales.</p>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Ingresos Reales</h3>
                                <p>{loadingStats ? '...' : `$${stats.ingresos.toLocaleString()}`}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Órdenes Totales</h3>
                                <p>{loadingStats ? '...' : stats.ordenes}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Clientes Registrados</h3>
                                <p>{loadingStats ? '...' : stats.clientes}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'users':
                return <UsuariosPanel />;
            case 'products':
                return <ReservaHabitaciones />;
            case 'tours':
                return <ResevaTours />;
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
                                className={`sidebar-btn ${activeTab === 'tours' ? 'active' : ''}`}
                                onClick={() => setActiveTab('tours')}
                            >
                                Tours
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
