import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Habitaciones from '../pages/Habitaciones'

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
