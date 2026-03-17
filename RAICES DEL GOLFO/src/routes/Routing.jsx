import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Habitaciones from '../pages/Habitaciones'



function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
