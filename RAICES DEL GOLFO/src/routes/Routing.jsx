import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import Registro from '../pages/Registro'




function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
