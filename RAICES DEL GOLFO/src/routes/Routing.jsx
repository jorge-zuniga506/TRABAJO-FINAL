import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Habitaciones from '../pages/Habitaciones'
import AcercaDe from '../pages/AcercaDe'
import Transporte from '../pages/Transporte'

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        <Route path="/transporte" element={<Transporte />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
