import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Habitaciones.css';

// ── Habitaciones estáticas (con imágenes y amenidades propias) ──
const habitacionesEstaticas = [
  {
    id: 'static-1',
    nombre: "Glamping Ecológico Isla Venado",
    descripcion: "Vive la experiencia de acampar con lujo en el corazón de Isla Venado. Estructuras elevadas con vistas inigualables al Golfo de Nicoya.",
    precio: 85,
    capacidad: 2,
    amenidades: ["Cama Queen", "Iluminación Solar", "Terraza Privada", "Desayuno Típico", "Senderos cercanos"],
    imagenes: ["/src/components/HOSPEDAJE/IMGEN/Habi.1.webp"]
  },
  {
    id: 'static-2',
    nombre: "Habitación Brisa del Golfo",
    descripcion: "Habitación amplia con ventanales grandes para disfrutar de la brisa marina. Ubicada a pocos pasos de la costa.",
    precio: 110,
    capacidad: 4,
    amenidades: ["2 Camas Matrimoniales", "Ventilador Potente", "Baño Privado", "Hamacas en exterior", "Cerca del muelle"],
    imagenes: ["/src/CHIRA/IMG_1019 (2).JPG"]
  },
  {
    id: 'static-3',
    nombre: "Eco-Refugio del Pescador",
    descripcion: "Sumérgete en la cultura local en este refugio construido con maderas locales y técnicas tradicionales de la isla.",
    precio: 70,
    capacidad: 2,
    amenidades: ["Cama Matrimonial", "Decoración Artesanal", "Vistas al manglar", "Guía de pesca incluido", "Ambiente tranquilo"],
    imagenes: ["/src/CHIRA/IMG_0984 (2).JPG"]
  },
  {
    id: 'static-4',
    nombre: "Habitación Vista al Mar",
    descripcion: "Disfruta de una vista espectacular al mar desde tu ventana. Habitación equipada con todo lo necesario para tu comodidad.",
    precio: 95,
    capacidad: 3,
    amenidades: ["Cama Matrimonial", "Balcón", "Aire Acondicionado", "TV por cable", "Vistas al mar"],
    imagenes: ["https://islavenado-cr.com/wp-content/uploads/2024/05/Cabinas-Atardecer-5.jpg"]
  },
  {
    id: 'static-5',
    nombre: "Suite Familiar Raíces",
    descripcion: "Espacio ideal para familias que buscan comodidad y cercanía a la naturaleza. Cuenta con múltiples ambientes y servicios.",
    precio: 150,
    capacidad: 5,
    amenidades: ["Camas King y Individuales", "Cocineta", "Área de estar", "Servicio a la habitación", "Acceso a piscina"],
    imagenes: ["/src/components/HOSPEDAJE/IMGEN/Habi.2.avif"]
  },
  {
    id: 'static-6',
    nombre: "Isla San Lucas",
    descripcion: "Ideal para quienes buscan descanso, aventura y un toque de historia, este espacio ofrece comodidad en medio de un entorno natural protegido.",
    precio: 150,
    capacidad: 7,
    amenidades: ["Camas King, cama Queen y literas dobles", "Cocineta", "Área de estar", "Servicio a la habitación", "Acceso a piscina"],
    imagenes: ["https://a0.muscache.com/im/pictures/miso/Hosting-963071887857759256/original/ea191874-8dbd-461b-a48e-5c8901893413.jpeg"]
  },
  {
    id: 'static-7',
    nombre: "Isla Caballo",
    descripcion: "Rodeada de aguas cálidas y paisajes naturales, la isla ofrece playas serenas, caminatas escénicas y la oportunidad de desconectarse del ritmo acelerado.",
    precio: 150,
    capacidad: 5,
    amenidades: ["Espacio rústico o tipo cabaña frente al mar", "Área de descanso con camas", "Cocina básica o equipada", "Acceso a la playa", "Ambiente tranquilo"],
    imagenes: ["https://a0.muscache.com/im/pictures/4ac2fa8a-7fe5-47e5-beb3-3df2823f2734.jpg"]
  }
];

// ── Imágenes de respaldo para habitaciones del admin (rotan para que cada una sea diferente) ──
const IMAGENES_DEFECTO = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
  "https://images.unsplash.com/photo-1521783988139-89397d761dce?w=600&q=80",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
  "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80",
];

function Habitaciones() {
  const navigate = useNavigate();
  const [habitacionesAdmin, setHabitacionesAdmin] = useState([]);
  const [cargando, setCargando] = useState(true);

  // ── Cargar habitaciones del panel admin ──
  useEffect(() => {
    fetch('http://localhost:3007/habitaciones')
      .then(res => res.json())
      .then(data => {
        // Solo mostrar las que estén disponibles
        const disponibles = data.filter(h => h.disponible);
        setHabitacionesAdmin(disponibles);
      })
      .catch(() => {
        // Si no hay conexión al servidor, simplemente no se agregan extras
        setHabitacionesAdmin([]);
      })
      .finally(() => setCargando(false));
  }, []);

  // ── Combinar estáticas + las del admin (evitar duplicados por nombre) ──
  const nombresEstaticos = new Set(habitacionesEstaticas.map(h => h.nombre.toLowerCase().trim()));
  const habitacionesNuevas = habitacionesAdmin.filter(
    h => !nombresEstaticos.has(h.nombre.toLowerCase().trim())
  );

  const todasLasHabitaciones = [...habitacionesEstaticas, ...habitacionesNuevas];

  return (
    <div className="habitaciones-grid">
      {todasLasHabitaciones.map(hab => (
        <div key={hab.id} className="habitacion-card">
          <div className="hab-image-container">
            <img
              src={hab.imagenes ? hab.imagenes[0] : IMAGENES_DEFECTO[todasLasHabitaciones.indexOf(hab) % IMAGENES_DEFECTO.length]}
              alt={hab.nombre}
              onError={e => { e.target.src = IMAGENES_DEFECTO[0]; }}
            />
            <div className="hab-price">${hab.precio}/noche</div>
          </div>
          <div className="hab-info">
            <h3>{hab.nombre}</h3>
            <p>{hab.descripcion || hab.description}</p>

            {/* Amenidades (solo si las tiene) */}
            {hab.amenidades && hab.amenidades.length > 0 && (
              <div className="hab-amenidades">
                {hab.amenidades.map((amenidad, index) => (
                  <span key={index} className="amenidad-tag">{amenidad}</span>
                ))}
              </div>
            )}

            {/* Info extra para habitaciones del admin */}
            {!hab.imagenes && (
              <div className="hab-amenidades">
                <span className="amenidad-tag">👥 Capacidad: {hab.capacidad} personas</span>
                <span className="amenidad-tag">🏷️ {hab.tipo}</span>
              </div>
            )}

            <button 
              className="btn-reservar-hab"
              onClick={() => navigate('/login')}
            >
              Reservar Habitación
            </button>
          </div>
        </div>
      ))}

      {/* Indicador de carga */}
      {cargando && (
        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
          Cargando habitaciones adicionales...
        </p>
      )}
    </div>
  );
}

export default Habitaciones;


