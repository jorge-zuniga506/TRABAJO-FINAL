import React, { useState, useEffect } from 'react';
import { ENDPOINTS } from '../../../config/api';
import './Habitaciones.css';
import ReservaModal from '../../MODAL/ReservaModal';
import { WHATSAPP_HABITACIONES } from '../../../config/whatsapp';

// ── Habitaciones estáticas (con imágenes y amenidades propias) ──
const habitacionesEstaticas = [
  {
    id: 'static-1',
    nombre: "Glamping Ecológico Isla de Chira",
    descripcion: "Vive la experiencia de acampar con lujo en el corazón de Isla de Chira. Estructuras elevadas con vistas inigualables al Golfo de Nicoya.",
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
    descripcion: "Espacio ideal para familias que buscan comodidad y cercanía a la naturaleza en un entorno seguro y espacioso.",
    precio: 150,
    capacidad: 5,
    amenidades: ["Camas King y Individuales", "Cocineta equipada", "Área de estar familiar", "Vistas al jardín", "Wifi en áreas comunes"],
    imagenes: ["/src/components/HOSPEDAJE/IMGEN/Habi.2.avif"]
  },
  {
    id: 'static-6',
    nombre: "Refugio Histórico San Lucas",
    descripcion: "Ideal para quienes buscan descanso, aventura y un toque de historia en la antigua isla prisión, hoy santuario de vida silvestre.",
    precio: 120,
    capacidad: 4,
    amenidades: ["Camas Matrimoniales", "Decoración Temática", "Tour histórico opcional", "Ventilación Natural", "Balcón con vista"],
    imagenes: ["https://a0.muscache.com/im/pictures/miso/Hosting-963071887857759256/original/ea191874-8dbd-461b-a48e-5c8901893413.jpeg"]
  },
  {
    id: 'static-7',
    nombre: "Cabaña Serena Isla Caballo",
    descripcion: "Rodeada de aguas cálidas y paisajes naturales, ofrece playas serenas y la oportunidad de desconectarse del ritmo acelerado.",
    precio: 110,
    capacidad: 4,
    amenidades: ["Cama King", "Frente al Mar", "Hamacas Privadas", "Cocina de leña", "Ambiente de retiro"],
    imagenes: ["https://a0.muscache.com/im/pictures/4ac2fa8a-7fe5-47e5-beb3-3df2823f2734.jpg"],
    disponible: true
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
  const [habitacionesAdmin, setHabitacionesAdmin] = useState([]);
  const [roomReservations, setRoomReservations] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  // ── Cargar datos del servidor ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hData, rData] = await Promise.all([
          fetch(ENDPOINTS.HABITACIONES).then(res => res.json()),
          fetch(ENDPOINTS.RESERVAS_HABITACIONES).then(res => res.json())
        ]);
        setHabitacionesAdmin(hData);
        setRoomReservations(rData);
      } catch (error) {
        console.error("Error cargando habitaciones/reservas:", error);
        setHabitacionesAdmin([]);
        setRoomReservations([]);
      } finally {
        setCargando(false);
      }
    };
    
    fetchData();
  }, []);

  // ── Función para determinar si una habitación está ocupada hoy ──
  const checkOccupied = (roomId, roomNombre) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return roomReservations.some(res => {
      // Coincidencia por ID o por nombre (para las estáticas)
      const matches = res.roomId === roomId || res.roomName === roomNombre;
      if (!matches || res.status !== 'Aprobada') return false;

      const checkIn = new Date(res.checkIn);
      const checkOut = new Date(res.checkOut);
      checkIn.setHours(0, 0, 0, 0);
      checkOut.setHours(0, 0, 0, 0);

      return today >= checkIn && today < checkOut;
    });
  };

  // ── Combinar estáticas + las del admin ──
  const todasLasHabitaciones = habitacionesEstaticas.map(staticHab => {
    const adminData = habitacionesAdmin.find(
      h => h.nombre.toLowerCase().trim() === staticHab.nombre.toLowerCase().trim()
    );
    
    // Normalizar disponibilidad (true por defecto si no existe en admin)
    const isManualDisabled = adminData ? adminData.disponible === false : false;
    const isNowOccupied = checkOccupied(adminData?.id, staticHab.nombre);

    return { 
      ...staticHab, 
      disponible: !isManualDisabled && !isNowOccupied,
      isManualDisabled,
      isNowOccupied
    };
  });

  // Agregar habitaciones nuevas que solo están en el admin
  const nombresEstaticos = new Set(habitacionesEstaticas.map(h => h.nombre.toLowerCase().trim()));
  const habitacionesNuevas = habitacionesAdmin
    .filter(h => !nombresEstaticos.has(h.nombre.toLowerCase().trim()))
    .map(h => ({
      ...h,
      isManualDisabled: h.disponible === false,
      isNowOccupied: checkOccupied(h.id, h.nombre),
      disponible: h.disponible !== false && !checkOccupied(h.id, h.nombre)
    }));

  const listaCompleta = [...todasLasHabitaciones, ...habitacionesNuevas];

  // ── Manejar apertura del modal ──
  const handleReservar = (habitacion) => {
    setHabitacionSeleccionada(habitacion);
    setIsModalOpen(true);
  };

  // ── Cerrar modal ──
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHabitacionSeleccionada(null);
  };

  return (
    <>
      <div className="habitaciones-grid">
        {listaCompleta.map(hab => (
          <div key={hab.id} className="habitacion-card">
            <div className="hab-image-container">
              <img
                src={hab.imagenes ? hab.imagenes[0] : (hab.imagen || IMAGENES_DEFECTO[listaCompleta.indexOf(hab) % IMAGENES_DEFECTO.length])}
                alt={hab.nombre}
                onError={e => { e.target.src = IMAGENES_DEFECTO[0]; }}
              />
              <div className="hab-price">${hab.precio}/noche</div>
            </div>
            <div className="hab-info">
              <div className="hab-header-info">
                <h3>{hab.nombre}</h3>
                <span className={`availability-badge ${hab.isManualDisabled ? 'unavailable' : hab.isNowOccupied ? 'occupied' : 'available'}`}>
                  {hab.isManualDisabled ? '● No Disponible' : hab.isNowOccupied ? '● Ocupada' : '● Disponible'}
                </span>
              </div>
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
                onClick={() => handleReservar(hab)}
                disabled={hab.disponible === false}
              >
                {hab.isManualDisabled ? 'No Disponible' : hab.isNowOccupied ? 'Habitación Ocupada' : 'Reservar Habitación'}
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

      {/* Modal flotante de reserva */}
      {habitacionSeleccionada && (
        <ReservaModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          tourName={habitacionSeleccionada.nombre}
          whatsappNumber={WHATSAPP_HABITACIONES}
        />
      )}
    </>
  );
}

export default Habitaciones;


