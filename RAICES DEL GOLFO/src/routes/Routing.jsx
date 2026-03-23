// src/routes/Routing.jsx
// Sistema de enrutamiento principal de la aplicación

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import Tours from '../pages/Tours';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Habitaciones from '../pages/Habitaciones';
import Gastronomia from '../pages/Gastronomia';
import Transporte from '../pages/Transporte';
import AcercaDe from '../pages/AcercaDe';
import HistoriaIslasPage from '../pages/HistoriaIslasPage';
import Admin from '../pages/Admin';
import Cliente from '../pages/Cliente';
import ProtectedRoute from './ProtectedRoute';
import Chatbot from '../components/CHATBOT/Chatbot';

function Routing() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Inicio />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/gastronomia" element={<Gastronomia />} />
        <Route path="/transporte" element={<Transporte />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        
        {/* Ruta de Historia - RUTA ÚNICA Y CONSISTENTE */}
        <Route path="/historia-de-las-islas" element={<HistoriaIslasPage />} />
        
        {/* Rutas de isla específicas */}
        <Route path="/isla-venado" element={<AcercaDe />} />

        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/reservar" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cliente"
          element={
            <ProtectedRoute allowedRoles={['cliente']}>
              <Cliente />
            </ProtectedRoute>
          }
        />

        {/* Ruta por defecto: 404 - redirige a inicio */}
        <Route path="*" element={<Inicio />} />
      </Routes>
      
      {/* Chatbot global */}
      <Chatbot />
    </BrowserRouter>
  );
}

export default Routing;
