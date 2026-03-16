import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold tracking-tight">
              Mi<span className="text-blue-400">App</span>
            </a>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-8 font-medium">
            <a href="#inicio" className="hover:text-blue-400 transition">HHFF</a>
            <a href="#servicios" className="hover:text-blue-400 transition">Servicios</a>
            <a href="#proyectos" className="hover:text-blue-400 transition">Proyectos</a>
            <a href="#contacto" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition">Contacto</a>
          </div>

          {/* Botón Móvil */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-slate-800 pb-4`}>
        <a href="#inicio" className="block py-2 px-4 text-sm hover:bg-slate-700">Inicio</a>
        <a href="#servicios" className="block py-2 px-4 text-sm hover:bg-slate-700">Servicios</a>
        <a href="#proyectos" className="block py-2 px-4 text-sm hover:bg-slate-700">Proyectos</a>
        <a href="#contacto" className="block py-2 px-4 text-sm text-blue-400 font-bold">Contacto</a>
      </div>
    </nav>
  );
};

export default Navbar;