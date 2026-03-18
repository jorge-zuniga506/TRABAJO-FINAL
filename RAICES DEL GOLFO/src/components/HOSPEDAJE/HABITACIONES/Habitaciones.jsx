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
    imagenes: ["/src/components/HOSPEDAJE/IMGEN/Habi.1.webp"]
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
    imagenes: ["https://islavenado-cr.com/wp-content/uploads/2024/05/Cabinas-Atardecer-5.jpg"]
  },
  {
    id: 5,
    nombre: "Suite Familiar Raíces",
    description: "Espacio ideal para familias que buscan comodidad y cercanía a la naturaleza. Cuenta con múltiples ambientes y servicios.",
    precio: 150,
    capacidad: 5,
    amenidades: ["Camas King y Individuales", "Cocineta", "Área de estar", "Servicio a la habitación", "Acceso a piscina"],
    imagenes: ["/src/components/HOSPEDAJE/IMGEN/Habi.2.avif"]
  },
  {
    id: 6,
    nombre: "Isla San Lucas",
    description: "Ideal para quienes buscan descanso, aventura y un toque de historia, este espacio ofrece comodidad en medio de un entorno natural protegido, Disfruta de atardeceres increíbles, caminatas por la isla y la paz de un destino poco explorado.",
    precio: 150,
    capacidad: 7,
    amenidades: ["Camas King, cama Queen y literas dobles", "Cocineta", "Área de estar", "Servicio a la habitación", "Acceso a piscina"],
    imagenes: ["https://a0.muscache.com/im/pictures/miso/Hosting-963071887857759256/original/ea191874-8dbd-461b-a48e-5c8901893413.jpeg"]
  },
   {
    id: 7,
    nombre: "Isla Caballo",
    description: "Rodeada de aguas cálidas y paisajes naturales, la isla ofrece playas serenas, caminatas escénicas y la oportunidad de desconectarse del ritmo acelerado.",
    precio: 150,
    capacidad: 5,
    amenidades: ["Espacio rústico o tipo cabaña frente al mar, Área de descanso con camas, Cocina básica o equipada, Zona exterior (terraza o rancho), Acceso a la playa y entorno natural, Ambiente tranquilo, ideal para desconectarse"],
    imagenes: ["https://a0.muscache.com/im/pictures/4ac2fa8a-7fe5-47e5-beb3-3df2823f2734.jpg"]
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
