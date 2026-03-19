import React from 'react'
import Navbar from '../components/INICIO/NAVBAR/Navbar'
import Hero from '../components/INICIO/HERO/Hero'
import Informacion from '../components/INICIO/INFORMACION/Informacion'
import Logros from '../components/INICIO/LOGROS/Logros'
import Contenedor from '../components/INICIO/CONTENEDOR/Contenedor'
import Carrusel from '../components/INICIO/CARRUSEL/Carrusel'
import ImgUltima from '../components/INICIO/IMGULTIMA/ImgUltima'
import Footer from '../components/INICIO/FOOTER/Footer'

 function Inicio() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Informacion />
      <Logros />
      <Contenedor />
      <Carrusel />
      <ImgUltima />
      <Footer />
    </div>
  )
}
export default Inicio