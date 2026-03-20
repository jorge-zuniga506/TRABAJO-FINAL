import React, { useState, useEffect, useRef } from 'react';
import { getTours } from '../../services/CrudTours';
import { getHabitaciones } from '../../services/CrudHabitaciones';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "¡Hola! Soy tu guía virtual de Raíces del Golfo. 🌴 ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros tours, habitaciones, comida o historia del Golfo.", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState({ tours: [], habitaciones: [] });
    const messagesEndRef = useRef(null);

    // Cargar datos al iniciar para respuestas dinámicas
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [toursRes, habsRes] = await Promise.all([
                    getTours(),
                    getHabitaciones()
                ]);
                setData({
                    tours: toursRes.filter(t => t.disponible),
                    habitaciones: habsRes.filter(h => h.disponible)
                });
            } catch (error) {
                console.error("Error al cargar datos para el chatbot", error);
            }
        };
        fetchData();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateResponse = (input) => {
        const text = input.toLowerCase();

        // Lógica de Habitaciones
        if (text.includes("habitacion") || text.includes("hospedaje") || text.includes("dormir") || text.includes("alojamiento")) {
            const minPrice = Math.min(...data.habitaciones.map(h => h.precio));
            return `Contamos con diversas opciones de hospedaje, desde Glamping en Isla Venado hasta suites familiares. Los precios inician en $${minPrice || 70} por noche. ¿Te gustaría saber sobre alguna habitación en específico?`;
        }

        // Lógica de Tours
        if (text.includes("tour") || text.includes("actividad") || text.includes("excursion") || text.includes("hacer")) {
            const tourList = data.tours.slice(0, 3).map(t => t.nombre).join(", ");
            return `¡La aventura te espera! Ofrecemos tours de pesca artesanal, recorridos por manglares, kayak y más. Algunos de los favoritos son: ${tourList}. ¿Deseas detalles de alguno?`;
        }

        // Lógica de Precios
        if (text.includes("precio") || text.includes("cuanto vale") || text.includes("costo") || text.includes("tarifa")) {
            return "Nuestros tours varían entre $10 y $30 por persona, y las habitaciones desde $70 hasta $150 la noche. ¿Buscas el precio de algo puntual?";
        }

        // Lógica de Comida
        if (text.includes("comida") || text.includes("restaurante") || text.includes("gastronomia") || text.includes("comer") || text.includes("menu")) {
            return "En Raíces del Golfo servimos comida criolla y maricscos frescos capturados por pescadores locales. ¡No te puedes ir sin probar nuestro pescado entero! Disponemos de área de restaurante frente al mar.";
        }

        // Lógica de Transporte
        if (text.includes("transporte") || text.includes("llegar") || text.includes("lancha") || text.includes("bote")) {
            return "Para llegar a nuestras instalaciones en las islas, coordinamos traslados en lancha desde embarcaderos principales (como Paquera o Puntarenas). El viaje es seguro y con vistas hermosas.";
        }

        // Lógica de Historia
        if (text.includes("historia") || text.includes("isla") || text.includes("cultura")) {
            return "Raíces del Golfo nació para preservar la cultura pesquera y la biodiversidad del Golfo de Nicoya. La Isla Venado y Chira tienen historias ricas de resiliencia y tradición artesanal.";
        }

        // Lógica de Reservas
        if (text.includes("reservar") || text.includes("reserva") || text.includes("comprar")) {
            return "¡Excelente elección! Puedes reservar directamente en nuestra sección de 'Reservar' en el menú principal, o dime qué te interesa y te guiaré pasito a pasito.";
        }

        // Respuesta por defecto (Rechazo de contexto)
        return "Lo siento, solo puedo ayudarte con información sobre Raíces del Golfo (tours, habitaciones, comida, transporte o historia de las islas).";
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, userMessage]);
        setInputValue("");

        // Simular escritura del bot
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: generateResponse(inputValue),
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
            {/* Floating Button */}
            <button className="chat-trigger" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <span className="close-icon">✕</span>
                ) : (
                    <div className="chat-btn-content">
                        <span className="chat-emoji">💬</span>
                        <span className="badge">1</span>
                    </div>
                )}
            </button>

            {/* Chat Window */}
            <div className="chat-window">
                <div className="chat-header">
                    <div className="bot-info">
                        <div className="bot-avatar">🌴</div>
                        <div>
                            <h3>Asistente Raíces</h3>
                            <span className="online-status">En línea</span>
                        </div>
                    </div>
                    <button className="minimize-btn" onClick={() => setIsOpen(false)}>—</button>
                </div>

                <div className="chat-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                            <p>{msg.text}</p>
                            <span className="message-time">{msg.time}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-footer" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        placeholder="Escribe tu mensaje..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" className="send-btn">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
