import React from 'react';
import './AdminPanel.css';
import NavbarAdmin from '../Navbar/NavbarAdmin';

function AdminPanel() {
    return (
        <div className="admin-panel">
            <NavbarAdmin />
            <div className="admin-container">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h2>Admin Panel</h2>
                    </div>
                    <ul className="sidebar-menu">
                        <li><a href="#dashboard">Dashboard</a></li>
                        <li><a href="#users">Users</a></li>
                        <li><a href="#products">Products</a></li>
                        <li><a href="#orders">Orders</a></li>
                        <li><a href="#settings">Settings</a></li>
                    </ul>
                </div>
                <div className="main-content">
                    {/* Content will be displayed here based on the selection from the sidebar */}
                    <h1>Bienvenido al Panel de Administrador</h1>
                    <p>Seleccione una opción del menú para comenzar.</p>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
