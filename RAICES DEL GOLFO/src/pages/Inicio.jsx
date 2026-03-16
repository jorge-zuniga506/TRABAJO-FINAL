import React from 'react'
import Navbar from '../components/INICIO/NAVBAR/Navbar'
import Hero from '../components/INICIO/HERO/Hero'
import Informacion from '../components/INICIO/INFORMACION/Informacion'
import Logros from '../components/INICIO/LOGROS/Logros'
import Contenedor from '../components/INICIO/CONTENEDOR/Contenedor'

 function Inicio() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Informacion />
      <Logros />
      <Contenedor />
    </div>

  
  )
}
export default Inicio