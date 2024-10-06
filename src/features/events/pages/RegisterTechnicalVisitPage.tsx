import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../../shared/components/Footer';
import { NavigationBar } from '../../../shared/components/NavigationBar';

export const RegisterTechnicalVisitPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full">
      
      {/* Banner */}
      <div className="h-80 bg-gray-300 mb-4">
        <img src="src\assets\images\FAB LAB UPC X.png" alt="Banner" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto">
        
        {/* Title and Description above form */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-red-500 m-2">Registro de  Visita tecnica</h1>
          <p className="text-gray-700 text-left">
            Utiliza el siguiente menú desplegable para escoger el tipo de evento que deseas crear: ponencia, taller o visita técnica.
          </p>
        </div>

        {/* Dropdown Menu */}
        <div className="relative mb-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-gray-200 px-10 py-2 rounded text-left"
          >
            Formulario de Registro de Visita Tecnica
          </button>
          {showDropdown && (
            <div className="absolute mt-2 w-full bg-white border rounded shadow-lg">
              <Link to="/workshop-register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Formulario de Registro para Taller</Link>
              <Link to="/event-register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Formulario de Registro para Evento</Link>
            </div>
          )}
        </div>

        {/* Form */}
        <form className="bg-white p-6 rounded shadow-md space-y-6">
          {/* Title and Description in the same row */}
          <div className="flex flex-row md:space-x-6">
            <div className="flex-1">
              <label className="block text-gray-700">Título</label>
              <input type="text" className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Misión y objetivo</label>
              <input type="text" className="w-full px-3 py-2 border rounded" />
            </div>
          </div>
          <div className="flex-1"> {/* Incrementar altura */}
              <label className="block text-gray-700">Descripción</label>
              <textarea className="w-full px-3 py-2 border rounded"></textarea>
          </div>

          {/* Image and Other Fields in Columns */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-1">
              <label className="block text-gray-700">Banner Imagen</label>
              <input type="file" className="w-full px-3 py-2 border rounded" />
            </div>
          </div>

          {/* Remaining Inputs */}
          <div className="flex-col gap-4">

            <div className="flex-1 grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700">Fecha</label>
                <input type="date" className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-gray-700">Hora</label>
                <input type="time" className="w-full px-3 py-2 border rounded" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700">Aforo</label>
              <input type="number" className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Modalidad</label>
              <select className="w-full px-3 py-2 border rounded">
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Enlace de publicación</label>
              <input type="url" className="w-full px-3 py-2 border rounded" />
            </div>

          </div>

          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Crear Evento</button>
        </form>  
      </div>

    </div>
  );
};

export default RegisterTechnicalVisitPage;