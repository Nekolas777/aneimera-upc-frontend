import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import AneimeraBanner from "../../../assets/images/aneimera-banner-white.png";
import { useNavigate } from "react-router-dom";
import { LoginEntity } from "../model/login";
import { authService } from "../service/auth.service";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginEntity>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, sethasError] = useState(false);

  // para manejar el data-binding
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const handleSubmitLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    sethasError(false);

    try {
      const token = await authService.signInUser(loginForm);
      login(token);
      navigate("/events-information", {
        replace: true,
      });
    } catch (error) {
      sethasError(true);
      console.log(`The login has failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // para manejar el timer de aparicion de "fallo de inicio de sesion" por 5 seg
  useEffect(() => {
    if (hasError) {
      const timer = setTimeout(() => {
        sethasError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasError]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='relative flex flex-col md:flex-row h-screen'>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='text-white text-3xl uppercase'>Cargando...</div>
        </div>
      )}
      <div className='flex-1 flex flex-col justify-center items-center p-6 bg-white'>
        <div className='flex items-center mb-1'>
          <img className='size-16' src='/logo-aneimeraUPC.webp' alt='imagen' />
          <h1 className='text-2xl'>ANEIMERA</h1>
        </div>

        <section className='py-8 text-center'>
          <h1 className='text-2xl font-bold'>Bienvenido a ANEIMERA</h1>
        </section>

        <form
          onSubmit={handleSubmitLogin}
          className='flex flex-col gap-6 w-full max-w-md mt-2'
        >
          <h5 className='text-xl font-semibold self-center'>
            Inicio de Sesión
          </h5>
          <div className='relative'>
            <RiMailLine className='text-xl absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <input
              type='text'
              name='username'
              value={loginForm.username}
              onChange={handleInputChange}
              autoComplete='off'
              className='w-full border border-gray-200 outline-none py-2 px-9 rounded-lg'
              placeholder='Correo electrónico'
            />
          </div>

          <div className='relative'>
            <RiLockLine className='text-xl absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              value={loginForm.password}
              onChange={handleInputChange}
              autoComplete='off'
              className='w-full border border-gray-200 outline-none py-2 px-9 rounded-lg'
              placeholder='Contraseña'
            />
            {showPassword ? (
              <RiEyeOffLine
                onClick={handleShowPassword}
                className='text-xl absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer'
              />
            ) : (
              <RiEyeLine
                onClick={handleShowPassword}
                className='text-xl absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:cursor-pointer'
              />
            )}
          </div>
          <button
            type='submit'
            className='select-none mt-3 font-medium bg-[#e10600] text-white w-full py-2 rounded-lg hover:scale-[1.02] transition-all duration-200'
          >
            Iniciar Sesión
          </button>
          {
            hasError && (
              <h1 className="text-sm text-center text-red-500 font-bold">El inicio de sesión ha fallado. Intentelo nuevamente</h1>
            )
          }
        </form>
        <div className="flex flex-col mt-6 text-center gap-1">
          <p className="text-slate-700"><span className="text-slate-800 font-medium mr-1 select-none">email:</span>neko@demo.com</p>
          <p className="text-slate-700"><span className="text-slate-800 font-medium mr-1 select-none">contraseña:</span>secretPassword123</p>
        </div>
      </div>
      <section className='hidden md:flex w-full md:w-1/2 bg-[#e10600]'>
        <img
          className='w-full h-auto max-h-1/2 object-contain'
          src={AneimeraBanner}
          alt='imagen'
        />
      </section>
    </div>
  );
};
