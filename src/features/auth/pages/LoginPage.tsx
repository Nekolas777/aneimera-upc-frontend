import React, { useState } from "react";

import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine
} from "react-icons/ri";

import 'react-toastify/dist/ReactToastify.css';


export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B8B8B]">
      <div className="bg-white p-6 w-full md:w-96">
        <section className="py-20">
          <div className="flex items-center justify-center">
            <img className="w-10 h-10" src="src/assets/logo.png" alt="imagen" />
            <h1 className="flex items-center justify-center">ANEIMERA</h1>
          </div>

          <div className="mb-5">
            <h1 className="text-2xl font-bold text-center">
              Bienvenido a ANEIMERA
            </h1>
            <h5 className="text-1xl font-bold text-center">
              Inicio de Sesión
            </h5>
        </div>
        </section>
        <form className="flex flex-col gap-4 ">
          <div className="relative">
            <RiMailLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
              placeholder="Correo electrònico"
            />
          </div>
          <div className="relative">
            <RiLockLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"} /*si es verdadero muestra texto*/
              className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
              placeholder="password"
            />
            {showPassword ? (
              <RiEyeOffLine
                onClick={handleShowPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              />
            ) : (
              <RiEyeLine
                onClick={handleShowPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              />
            )}
          </div>
          <div>         
            <button className="mt-6 bg-[#CB4A4A] text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all"> 
              Sign IN
            </button>
          </div>
        </form>
      </div>

      <section className="bg-[#8B8B8B] p-6 w-full md:w-96">
        <img className="w-full h-full md:w-96" src="src/assets/logofondo.png" alt="imagen" />
      </section>
    </div>
  )
}