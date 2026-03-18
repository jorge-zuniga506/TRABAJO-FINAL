import React from 'react';
import TourCard from '../INFO/TourCard';
// Reusing ToursSection.css

import islaImg1 from '../img toures/isla1.jpg';
import islaImg2 from '../img toures/isla2.jpg';
import islaImg3 from '../img toures/isla3.jpg';
import islaImg4 from '../img toures/isla4.jpg';
import islaImg5 from '../img toures/isla5.jpg';

function ToursIsla() {
  const tours = [
    {
      id: 1,
      imagen: islaImg1,
      nombre: 'Tour de pesca artesanal',
      precio: '$15 – $25 USD',
      descripcion: 'Experiencia con pescadores locales y técnicas tradicionales.',
    },
    {
      id: 2,
      imagen: islaImg2,
      nombre: 'Tour en bote por el Golfo',
      precio: '$20 – $40 USD',
      descripcion: 'Paseos en lancha visitando otras islas cercanas del Golfo de Nicoya.',
    },
    {
      id: 3,
      imagen: islaImg3,
      nombre: 'Kayak y actividades acuáticas',
      precio: '$10 – $25 USD',
      descripcion: 'Recorridos en kayak y exploración del mar a tu propio ritmo.',
    },
    {
      id: 4,
      imagen: islaImg4,
      nombre: 'Senderismo y tours ecológicos',
      precio: '$10 – $20 USD',
      descripcion: 'Caminatas guiadas por la isla disfrutando de la naturaleza local.',
    },
    {
      id: 5,
      imagen: islaImg5,
      nombre: 'Experiencias de bienestar',
      precio: '$10 – $25 USD',
      descripcion: 'Actividades como yoga, meditación y relajación frente al mar.',
    }
  ];

  return (
    <section id="tours-isla" className="tours-section isla-bg">
      <div className="tours-container">
        <div className="tours-header">
          <h2 className="tours-title">Tours Isla Venado</h2>
          <div className="tours-divider"></div>
          <p className="tours-subtitle">
            Aventúrate por la Isla Venado con nuestras actividades diseñadas para todas las edades.
          </p>
        </div>
        
        <div className="tours-grid isla-grid">
          {tours.map(tour => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ToursIsla;
