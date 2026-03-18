import React from 'react';
import './TourCard.css';

function TourCard({ imagen, nombre, descripcion, precio, duracion }) {
  return (
    <div className="tour-card">
      <div className="tour-card-image-wrapper">
        <img src={imagen} alt={nombre} className="tour-card-image" />
        {duracion && (
          <div className="tour-card-duration">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>{duracion}</span>
          </div>
        )}
      </div>
      <div className="tour-card-content">
        <h3 className="tour-card-title">{nombre}</h3>
        <p className="tour-card-description">{descripcion}</p>
        <div className="tour-card-footer">
          <div className="tour-card-price">
            <span className="price-label">Precio</span>
            <span className="price-value">{precio}</span>
          </div>
          <button className="tour-card-btn">Reservar</button>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
