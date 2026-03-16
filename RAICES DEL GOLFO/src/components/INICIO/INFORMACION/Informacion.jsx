import React from 'react';
import './Informacion.css';

function Informacion() {
  return (
    <section className="info-section">
      <div className="info-container">
        <div className="info-content">
          <h2 className="info-title">Sobre Raíces del Golfo</h2>
          <div className="info-divider"></div>
          <p className="info-description">
            Raíces del Golfo nace del amor por la naturaleza y la cultura única de la región del Golfo Dulce en Costa Rica.
            Nuestro propósito es conectar a los viajeros con la esencia más pura del ecosistema marino y terrestre,
            ofreciendo experiencias sostenibles que benefician a las comunidades locales.
          </p>
          <p className="info-description">
            Desde hospedaje inmersivo hasta emocionantes tours de avistamiento y gastronomía auténtica,
            te invitamos a vivir una aventura inolvidable respetando la riqueza natural que nos rodea.
          </p>
          
          <div className="info-stats">
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Años de Experiencia</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Compromiso Sostenible</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Visitantes Felices</span>
            </div>
          </div>
        </div>

        <div className="info-image-container">
          {/* Placeholder para una imagen o collage decorativo de la reserva/golfo */}
          <div className="info-image-placeholder">
            <span className="placeholder-text">Descubre la Belleza del Golfo</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Informacion;
