import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TourNavbar.css';

function TourNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Habitaciones', path: '/habitaciones' },
    { name: 'Tours', path: '/tours' },
    { name: 'Gastronomía', path: '/gastronomia' },
    { name: 'Transporte', path: '/transporte' },
    { name: 'Isla Venado', path: '/isla-venado' },
  ];

  return (
    <nav className={`tour-navbar ${scrolled ? 'tour-navbar-scrolled' : ''}`}>
      <div className="tour-navbar-container">
        <div className="tour-navbar-logo">
          <Link to="/" className="tour-logo-text">
            Raíces del Golfo
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className={`tour-navbar-menu ${menuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <li key={index} className="tour-navbar-item">
              <Link 
                to={link.path} 
                className={`tour-navbar-link ${location.pathname === link.path ? 'active-link' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* Mobile Reservar link */}
          <li className="tour-navbar-item mobile-only">
             <Link 
                to="/reservar" 
                className="tour-navbar-link tour-btn-reservar-mobile"
                onClick={() => setMenuOpen(false)}
              >
                Reservar
              </Link>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="tour-navbar-actions">
          <Link to="/reservar" className="tour-btn-reservar">
            Reservar Now
          </Link>
          <div className={`tour-menu-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TourNavbar;
