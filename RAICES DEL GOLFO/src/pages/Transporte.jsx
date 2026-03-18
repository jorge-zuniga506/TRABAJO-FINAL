import React from 'react';
import Navbar from '../components/INICIO/NAVBAR/Navbar';
import Footer from '../components/INICIO/IMGULTIMA/ImgUltima';
import TransporteComponent from '../components/TRANSPORTE/Transporte';
import "../components/AcercaDe/AcercaDe.css" // Reusing similar hero/layout styles if applicable, or we can add specific ones

function Transporte() {
  return (
    <div className="transporte-page">
      <Navbar />

      <header className="transporte-hero" style={{ 
        backgroundColor: '#2e7d32', 
        padding: '100px 20px', 
        textAlign: 'center', 
        color: 'white',
        marginTop: '70px'
      }}>
        <h1>Horarios y Transporte</h1>
        <p>Planifica tu viaje a la hermosa Isla Venado.</p>
      </header>

      <main className="transporte-container">
        <TransporteComponent />
      </main>

      <Footer />
    </div>
  );
}

export default Transporte;
