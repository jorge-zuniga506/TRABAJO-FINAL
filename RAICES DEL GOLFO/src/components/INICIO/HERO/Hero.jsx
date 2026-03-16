import React from 'react';
import './Hero.css';
import bgVideo from '../../../VIDEOS/Costa Rica Whale Watching_ Why Golfo Dulce Is So Special.mp4';

function Hero() {
  return (
    <div className="hero-container">
      <video autoPlay loop muted playsInline className="hero-video">
        <source src={bgVideo} type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">Descubre las Raíces del Golfo</h1>
        <p className="hero-subtitle">Naturaleza, Hospedaje y Aventura Inolvidable en Costa Rica</p>
        <button className="hero-btn">Explorar Ahora</button>
      </div>
    </div>
  );
}

export default Hero;
