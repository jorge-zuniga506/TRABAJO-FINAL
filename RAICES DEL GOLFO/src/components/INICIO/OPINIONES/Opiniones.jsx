import React, { useState, useEffect } from 'react';
import { getOpiniones, createOpinion } from '../../../services/CrudOpiniones';
import './Opiniones.css';

function Opiniones() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Estado para el formulario de nuevo comentario
  const [newReview, setNewReview] = useState({
    calificacion: 5,
    comentario: '',
    experiencia: 'General'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [reviews]);

  const fetchReviews = async () => {
    try {
      const data = await getOpiniones();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = storedUser.name || "Cliente Satisfecho";
    
    // Imagen por defecto si no tiene avatar
    const defaultImage = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop";

    const feedbackData = {
      ...newReview,
      nombre: userName,
      imagen: defaultImage,
      calificacion: parseInt(newReview.calificacion)
    };

    try {
      const addedReview = await createOpinion(feedbackData);
      setReviews([...reviews, addedReview]);
      setNewReview({ calificacion: 5, comentario: '', experiencia: 'General' });
      alert("¡Gracias por tu comentario!");
    } catch (error) {
      alert("Error al enviar el comentario");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
    ));
  };

  if (loading) return <div className="loading-opiniones">Cargando experiencias...</div>;

  return (
    <section className="opiniones-section">
      <div className="opiniones-container">
        <div className="opiniones-header">
          <h2 className="opiniones-title">Opiniones de nuestros clientes</h2>
          <div className="rating-summary">
            <span className="average-number">4.8</span>
            <div className="stars-box">
              {renderStars(5)}
            </div>
            <span className="total-reviews">Promedio basado en +200 reseñas</span>
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="carousel-wrapper">
            <button className="carousel-btn prev" onClick={prevReview}>❮</button>
            
            <div className="review-card-container">
              {reviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className={`review-card ${index === currentIndex ? 'active' : ''}`}
                >
                  {index === currentIndex && (
                    <>
                      <div className="review-img-box">
                        <img src={review.imagen} alt={review.nombre} />
                      </div>
                      <div className="review-content">
                        <div className="review-stars">{renderStars(review.calificacion)}</div>
                        <p className="review-text">"{review.comentario}"</p>
                        <h4 className="review-name">{review.nombre}</h4>
                        <span className="review-experience">{review.experiencia}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <button className="carousel-btn next" onClick={nextReview}>❯</button>
          </div>
        )}

        <div className="carousel-dots">
          {reviews.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>

        {/* Formulario para escribir nuevo comentario */}
        <div className="write-review-section">
          <h3>Cuéntanos tu experiencia</h3>
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Calificación:</label>
              <select name="calificacion" value={newReview.calificacion} onChange={handleInputChange}>
                <option value="5">⭐⭐⭐⭐⭐ (Excelente)</option>
                <option value="4">⭐⭐⭐⭐ (Muy Bueno)</option>
                <option value="3">⭐⭐⭐ (Bueno)</option>
                <option value="2">⭐⭐ (Regular)</option>
                <option value="1">⭐ (Malo)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Comentario:</label>
              <textarea 
                name="comentario" 
                value={newReview.comentario} 
                onChange={handleInputChange} 
                placeholder="¿Qué te pareció tu visita?"
                required
              />
            </div>
            <div className="form-group">
              <label>Experiencia realizada:</label>
              <input 
                type="text" 
                name="experiencia" 
                value={newReview.experiencia} 
                onChange={handleInputChange} 
                placeholder="Ej: Tour de Pesca, Hospedaje..."
              />
            </div>
            <button type="submit" className="submit-review-btn" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Comentario"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Opiniones;
