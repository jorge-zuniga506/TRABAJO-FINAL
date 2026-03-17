import React from 'react';
import Navbar from '../components/INICIO/NAVBAR/Navbar';
import Footer from '../components/INICIO/IMGULTIMA/ImgUltima';
import '../components/AcercaDe/AcercaDe.css';

const sections = [
  {
    title: "Nuestra Historia",
    content: "Raíces del Golfo nació del sueño de compartir la belleza inigualable del Golfo de Nicoya con el mundo. Lo que comenzó como un pequeño emprendimiento familiar en Isla Venado ha crecido hasta convertirse en un referente de turismo sostenible en la región."
  },
  {
    title: "Misión",
    content: "Proveer experiencias turísticas auténticas en Isla Venado a través de la Posada Rural La Amistad, celebrando la identidad isleña y promoviendo el desarrollo socioeconómico local mediante un turismo sostenible y responsable."
  },
  {
    title: "Visión",
    content: "Consolidar a la Posada Rural La Amistad como el referente principal de hospitalidad en Isla Venado, siendo reconocidos por nuestra conexión profunda con la naturaleza y nuestro impacto positivo en la comunidad del Golfo de Nicoya."
  }
];

function AcercaDe() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado con éxito. ¡Gracias por contactarnos!');
  };

  return (
    <div className="acerca-de-page">
      <Navbar />

      <header className="acerca-de-hero">
        <h1>Sobre Nosotros</h1>
        <p>Conectando personas con la naturaleza y la cultura del Golfo.</p>
      </header>

      <main className="acerca-container">
        <section className="acerca-grid">
          {sections.map((section, index) => (
            <div key={index} className="acerca-card">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </section>

        <section className="contacto-section">
          <div className="contacto-header">
            <h2>Contáctanos</h2>
            <p>¿Tienes alguna duda? Estamos aquí para ayudarte.</p>
          </div>
          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input type="text" id="nombre" placeholder="Tu nombre" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" placeholder="ejemplo@correo.com" required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="asunto">Asunto</label>
              <input type="text" id="asunto" placeholder="¿En qué podemos ayudarte?" required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
            </div>
            <button type="submit" className="btn-enviar">Enviar Mensaje</button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AcercaDe;
