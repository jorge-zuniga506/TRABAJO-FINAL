import React, { useEffect } from 'react';
import Navbar from '../INICIO/NAVBAR/Navbar';
import './HistoriaIslas.css';

const islandsData = [
  {
    name: "Isla Chira",
    description: "La más grande del golfo. Históricamente conocida por su producción de sal y su rica herencia pesquera. Es un santuario de biodiversidad marina."
  },
  {
    name: "Isla Venado",
    description: "Hogar de la Posada Rural La Amistad. Famosa por su hospitalidad, sus manglares vírgenes y su comunidad dedicada a la pesca artesanal y el turismo rural."
  },
  {
    name: "Isla San Lucas",
    description: "Antigua prisión nacional, hoy convertida en Parque Nacional. Un sitio de inmenso valor histórico y natural que guarda los secretos del pasado de Costa Rica."
  },
  {
    name: "Isla Caballo",
    description: "Una de las joyas más tranquilas del golfo, ideal para quienes buscan desconexión total y contacto puro con el ecosistema marino."
  }
];

function HistoriaIslas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="historia-islas">
      <Navbar variant="solid" />

      <header className="historia-hero">
        <h1>Nuestra Herencia</h1>
        <p>Descubre el legado cultural y natural que define al Golfo de Nicoya y a Raíces del Golfo.</p>
      </header>

      <main className="historia-container">
        {/* Section: Posada Rural La Amistad */}
        <section className="historia-section">
          <div className="historia-content">
            <h2>Posada Rural La Amistad</h2>
            <p>
              Nuestra historia comienza con un sueño familiar en las costas de Isla Venado. Lo que nació como 
              un pequeño emprendimiento para ofrecer refugio a los pescadores y viajeros, se transformó con 
              el tiempo en la <strong>Posada Rural La Amistad</strong>.
            </p>
            <p>
              Fundada bajo los principios de la hospitalidad isleña y el respeto por el medio ambiente, 
              nuestra posada ha sido el puente entre la cultura local y visitantes de todo el mundo. 
              Cada rincón de nuestra casa cuenta una historia de esfuerzo, tradición y amor por el golfo.
            </p>
            <p>
              Hoy, somos orgullosos representantes de "Raíces del Golfo", integrando servicios que 
              celebran la gastronomía autóctona, los recorridos naturales y la calidez humana que nos caracteriza.
            </p>
          </div>
          <div className="historia-image-wrapper">
            <img src="/src/CHIRA/IMG_0984 (2).JPG" alt="Historia de la Posada" />
          </div>
        </section>

        {/* Section: Islas del Golfo */}
        <section className="historia-section reverse">
          <div className="historia-content">
            <h2>Islas del Golfo de Nicoya</h2>
            <p>
              El Golfo de Nicoya no es solo un cuerpo de agua; es un archipiélago de historias. Desde tiempos 
              ancestrales, estas islas han sido hogar de culturas vibrantes que han sabido vivir en armonía 
              con el mar.
            </p>
            <p>
              Cada isla posee su propia identidad. La formación geológica del golfo ha permitido la creación 
              de diversos microclimas y ecosistemas de manglares que son vitales para la reproducción 
              de especies marinas en el Pacífico Central.
            </p>
            <p>
              Explorar las islas es viajar en el tiempo, desde las minas de sal de Chira hasta los senderos 
              históricos de San Lucas, sintiendo siempre la brisa y el sol que han bañado estas tierras por siglos.
            </p>
          </div>
          <div className="historia-image-wrapper">
            <img src="/src/CHIRA/IMG_1019 (2).JPG" alt="Islas del Golfo" />
          </div>
        </section>

        {/* Section: Grid de Islas */}
        <section>
          <div className="historia-content" style={{textAlign: 'center', marginBottom: '50px'}}>
            <h2>Explora Nuestras Islas</h2>
            <p>Cada una con un encanto único y una historia por contar.</p>
          </div>
          <div className="islas-grid">
            {islandsData.map((isla, index) => (
              <div key={index} className="isla-card">
                <h3>{isla.name}</h3>
                <p>{isla.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>


    </div>
  );
}

export default HistoriaIslas;
