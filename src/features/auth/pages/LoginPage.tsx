import React, { useState } from "react";
import { MdVisibility } from "react-icons/md";
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
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-white">
        <div className="flex items-center mb-6">
          <img className="w-12 h-12" src="src/assets/logo.png" alt="imagen" />
          <h1 className="ml-2 text-xl">ANEIMERA</h1>
        </div>

        <section className="py-4 text-center">
          <h1 className="text-2xl font-bold">Bienvenido a ANEIMERA</h1>
          <h5 className="text-lg font-semibold">Inicio de Sesión</h5>
        </section>

        <form className="flex flex-col gap-4 w-full max-w-md">
          <div className="relative">
            <RiMailLine className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
              placeholder="Correo electrónico"
            />
          </div>

          <div className="relative">
            <RiLockLine className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
              placeholder="Contraseña"
            />
            {showPassword ? (
              <RiEyeOffLine
                onClick={handleShowPassword}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              />
            ) : (
              <RiEyeLine
                onClick={handleShowPassword}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer"
              />
            )}
          </div>

          <button className="mt-3 bg-[#e10600] text-white w-full py-2 rounded-lg hover:scale-105 transition-all">
            Iniciar Sesión
          </button>
        </form>
      </div>

      <section className="hidden md:flex w-full md:w-1/2 bg-[#e10600]">
        <img className="w-full h-auto max-h-1/2 object-contain" src="src/assets/logofondo.png" alt="imagen" />
      </section>
    </div>
  );






}