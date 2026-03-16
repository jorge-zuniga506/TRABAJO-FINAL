import React from 'react'
import Navbar from '../components/INICIO/NAVBAR/Navbar'
import Hero from '../components/INICIO/HERO/Hero'
import Informacion from '../components/INICIO/INFORMACION/Informacion'
import Logros from '../components/INICIO/LOGROS/Logros'
import Servicios from '../components/INICIO/SERVICIOS/Servicios'
import Contenedor from '../components/INICIO/CONTENEDOR/Contenedor'
import Carrusel from '../components/INICIO/CARRUSEL/Carrusel'
import Footer from '../components/INICIO/IMGULTIMA/ImgUltima'

 function Inicio() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Informacion />
      <Logros />
      <Contenedor />
      <Carrusel />
      <Servicios />
      <Footer />
    </div>

  
  )
}
export default Inicio