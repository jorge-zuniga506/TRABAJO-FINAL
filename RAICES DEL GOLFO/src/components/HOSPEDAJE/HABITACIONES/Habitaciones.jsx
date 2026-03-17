import React from 'react';
import './Habitaciones.css';

const habitacionesData = [
  {
    id: 1,
    nombre: "Glamping Ecológico Isla Venado",
    description: "Vive la experiencia de acampar con lujo en el corazón de Isla Venado. Estructuras elevadas con vistas inigualables al Golfo de Nicoya.",
    precio: 85,
    capacidad: 2,
    amenidades: ["Cama Queen", "Iluminación Solar", "Terraza Privada", "Desayuno Típico", "Senderos cercanos"],
    imagenes: ["/src/CHIRA/unnamed.jpg"]
  },
  {
    id: 2,
    nombre: "Habitación Brisa del Golfo",
    description: "Habitación amplia con ventanales grandes para disfrutar de la brisa marina. Ubicada a pocos pasos de la costa.",
    precio: 110,
    capacidad: 4,
    amenidades: ["2 Camas Matrimoniales", "Ventilador Potente", "Baño Privado", "Hamacas en exterior", "Cerca del muelle"],
    imagenes: ["/src/CHIRA/IMG_1019 (2).JPG"]
  },
  {
    id: 3,
    nombre: "Eco-Refugio del Pescador",
    description: "Sumérgete en la cultura local en este refugio construido con maderas locales y técnicas tradicionales de la isla.",
    precio: 70,
    capacidad: 2,
    amenidades: ["Cama Matrimonial", "Decoración Artesanal", "Vistas al manglar", "Guía de pesca incluido", "Ambiente tranquilo"],
    imagenes: ["/src/CHIRA/IMG_0984 (2).JPG"]
  },
  {
    id: 4,
    nombre: "Habitación Vista al Mar",
    description: "Disfruta de una vista espectacular al mar desde tu ventana. Habitación equipada con todo lo necesario para tu comodidad.",
    precio: 95,
    capacidad: 3,
    amenidades: ["Cama Matrimonial", "Balcón", "Aire Acondicionado", "TV por cable", "Vistas al mar"],
    imagenes: ["/src/components/HOSPEDAJE/IMGEN/Habi.1.webp"]
  },
  {
    id: 5,
    nombre: "Suite Familiar Raíces",
    description: "Espacio ideal para familias que buscan comodidad y cercanía a la naturaleza. Cuenta con múltiples ambientes y servicios.",
    precio: 150,
    capacidad: 5,
    amenidades: ["Camas King y Individuales", "Cocineta", "Área de estar", "Servicio a la habitación", "Acceso a piscina"],
    imagenes: ["/src/components/HOSPEDAJE/IMGEN/Habi.2.avif"]
  }
];

function Habitaciones() {
  return (
    <div className="habitaciones-grid">
      {habitacionesData.map(hab => (
        <div key={hab.id} className="habitacion-card">
          <div className="hab-image-container">
            <img src={hab.imagenes[0]} alt={hab.nombre} />
            <div className="hab-price">${hab.precio}/noche</div>
          </div>
          <div className="hab-info">
            <h3>{hab.nombre}</h3>
            <p>{hab.description}</p>
            <div className="hab-amenidades">
              {hab.amenidades.map((amenidad, index) => (
                <span key={index} className="amenidad-tag">{amenidad}</span>
              ))}
            </div>
            <button className="btn-reservar-hab">Reservar Habitación</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Habitaciones;
