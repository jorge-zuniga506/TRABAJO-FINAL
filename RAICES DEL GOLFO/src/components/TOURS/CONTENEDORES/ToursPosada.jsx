import React from 'react';
import TourCard from '../INFO/TourCard';
import './ToursSection.css'; // Shared CSS for both sections

import posadaImg1 from '../img toures/posada1.jpg';
import posadaImg2 from '../img toures/posada2.jpg';
import posadaImg3 from '../img toures/posada3.jpg';
import posadaImg4 from '../img toures/posada4.jpg';

function ToursPosada() {
  const tours = [
    {
      id: 1,
      imagen: posadaImg1,
      nombre: 'Tour de pesca artesanal',
      duracion: '4 horas',
      precio: '$15 USD',
      descripcion: 'Experiencia con pescadores locales donde se aprenden técnicas tradicionales y se participa en la pesca.',
    },
    {
      id: 2,
      imagen: posadaImg2,
      nombre: 'Taller de artesanías',
      duracion: '3 horas',
      precio: '$10 USD',
      descripcion: 'Taller para crear artesanías locales con materiales de la zona.',
    },
    {
      id: 3,
      imagen: posadaImg3,
      nombre: 'Avistamiento de aves marinas',
      duracion: '1 hora',
      precio: '$12 - $16 USD',
      descripcion: 'Tour guiado para observar aves en la isla y alrededores.',
    },
    {
      id: 4,
      imagen: posadaImg4,
      nombre: 'Recorrido por los manglares',
      duracion: '2 horas',
      precio: '$12 - $16 USD',
      descripcion: 'Paseo en bote por manglares con guía local, observando fauna y ecosistemas.',
    }
  ];

  return (
    <section id="tours-posada" className="tours-section posada-bg">
      <div className="tours-container">
        <div className="tours-header">
          <h2 className="tours-title">Tours Posada Rural La Amistad</h2>
          <div className="tours-divider"></div>
          <p className="tours-subtitle">
            Descubre la esencia del Golfo de Nicoya a través de nuestras experiencias diseñadas para conectar con la naturaleza y la cultura local.
          </p>
        </div>
        
        <div className="tours-grid">
          {tours.map(tour => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ToursPosada;
