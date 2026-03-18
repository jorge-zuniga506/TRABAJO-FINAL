import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Tours from '../pages/Tours'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Habitaciones from '../pages/Habitaciones'
import Gastronomia from '../pages/Gastronomia'
import Transporte from '../pages/Transporte'
import AcercaDe from '../pages/AcercaDe'
import HistoriaIslasPage from '../pages/HistoriaIslasPage'

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservar" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/gastronomia" element={<Gastronomia />} />
        <Route path="/transporte" element={<Transporte />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        {/* Aditionally mapping /isla-venado to AcercaDe as requested by navbar links */}
        <Route path="/isla-venado" element={<AcercaDe />} />
        <Route path="/historia-de-las-islas" element={<HistoriaIslasPage />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
