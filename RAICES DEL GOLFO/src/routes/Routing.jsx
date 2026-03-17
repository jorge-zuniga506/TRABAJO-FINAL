import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Tours from '../pages/Tours'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Habitaciones from '../pages/Habitaciones'
import Gastronomia from '../pages/Gastronomia'
            

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/gastronomia" element={<Gastronomia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
