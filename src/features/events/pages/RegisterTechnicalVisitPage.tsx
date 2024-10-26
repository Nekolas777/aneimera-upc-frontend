import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegisterTechnicalVisitPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full font-poppins">
      
      {/* Banner */}
      <div className="h-80 bg-gray-300 mb-4">
        <img src="src\assets\images\FAB LAB UPC X.png" alt="Banner" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto">
        
        {/* Title and Description above form */}
        <div className="flex flex-col mb-6 items-center md:items-start md:mx-20">
          <h1 className="text-3xl font-bold text-red-500 my-2">Registro de evento</h1>
          <p className="text-gray-700">
            Utiliza el siguiente menú desplegable para escoger el tipo de evento que deseas crear: ponencia, taller o visita técnica.
          </p>
        </div>
        
        <div className="flex flex-col justify-center w-3/4 mx-auto">
          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-gray-200 px-10 py-2 rounded text-left flex justify-between items-center shadow-xl"
            >
              Formulario de Registro para Visita Técnica
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform duration-200 ${showDropdown ? 'rotate-180' : 'rotate-0'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.242 4.242a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showDropdown && (
            <div className="absolute w-full bg-white border rounded shadow-lg">
              <Link to="/workshop-register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Formulario de Registro para Taller</Link>
              <Link to="/event-register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Formulario de Ponencia</Link>
            </div>
            )}
          </div>
  
          {/* Form */}
          
          <form className="bg-white p-6 rounded shadow-md space-y-6 border-black mb-10 shadow-lg">
            {/* Title and Description in the same row */}
            <div className="flex md:flex-row flex-col md:space-x-6 my-6"> {/* md flex */}
              <div className="flex-1">
                <label className="block text-gray-700">Título*</label>
                <input type="text" className="w-full px-3 py-3 bg-gray-100 shadow-md rounded" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Misión y objetivo*</label>
                <input type="text" className="w-full bg-gray-100 px-3 py-3 shadow-md  rounded" />
              </div>
            </div>
            <div className="flex-1 h-32"> {/* Incrementar altura */}
                <label className="block text-gray-700 my-1 mt-6">Descripción*</label>
                <textarea className="w-full h-full bg-gray-100 px-3 py-2 shadow-md  rounded"></textarea>
            </div>
  
            <div className="flex flex-col md:flex-row md:space-x-6">
              {/* Remaining Inputs */}
              <div className="flex-col gap-4 w-full">
    
                <div className="flex md:flex-row flex-col md:space-x-6">
                  <div className="flex-1">
                    <label className="block text-gray-700 mt-6">Fecha</label>
                    <input type="date" className="w-full bg-gray-100 px-3 py-3 shadow-md border-black rounded" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 mt-6">Hora</label>
                    <input type="time" className="w-full bg-gray-100 px-3 py-3 shadow-md  rounded" />
                  </div>
                </div>
    
                <div className="flex md:flex-row flex-col md:space-x-6">
                  <div className="flex-1">
                    <label className="block text-gray-700 mt-6">Aforo</label>
                    <input type="number" className="w-full bg-gray-100 px-3 py-3 shadow-md rounded" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 mt-6">Modalidad</label>
                    <select className="w-full bg-gray-100 px-3 py-3 shadow-md  rounded">
                      <option value="presencial">Presencial</option>
                      <option value="virtual">Virtual</option>
                    </select>
                  </div>
                </div>
    
                <div className="flex-1">
                  <label className="block text-gray-700 mt-6">Enlace de publicación*</label>
                  <input type="url" className="w-full bg-gray-100 px-3 py-3 shadow-md  rounded" />
                </div>     
              </div>

              {/* Image and Other Fields in Columns */}
              <div className="flex flex-col md:flex-row w-full">
                <div className="flex-1">
                  <label className="block text-gray-700 mt-6">Banner Imagen*</label>
                  <input type="file" className="w-full bg-gray-100 h-5/6 px-3 py-2 shadow-md  rounded" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col  md:flex-row w-full">
              <button type="submit" className="bg-gray-200 w-full mt-6 text-black px-4 py-2 mx-3 rounded">Descargar Data</button>
              <button type="submit" className="bg-red-500 w-full mt-6 text-white px-4 py-2 mx-3 rounded">Crear Evento</button>
            </div>
            
            <h6 className="flex text-[12px] text-left">*Los campos son obligatorios</h6>
          </form>  
        </div>
      </div>


    </div>
  );
};

export default RegisterTechnicalVisitPage;