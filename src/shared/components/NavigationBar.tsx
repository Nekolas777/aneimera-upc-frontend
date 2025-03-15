import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import LogoAneimera from "../../assets/images/aneimera-logo.png";
import { WebsiteIcon } from "../../assets/icons/WebsiteIcon";
import { useAuth } from "../../features/auth/hooks/useAuth";

export const NavigationBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();

    // replace es para que no pueda retroceder en el hist de nav
    // ya que una vez cerrado la sesion no podra ingresar a la ruta anterior
    navigate("/login", {
      replace: true,
    });
  };

  return (
    /* sticky top-0 z-50 consider this for topbar flexible in <header> */
    <header className='sticky top-0 z-50 bg-gray-200'>
      <div className='section-container h-full flex items-center justify-between'>
        <figure
          onClick={() => navigate("/events-information")}
          className='w-32 sm:w-44 cursor-pointer'
        >
          <img className='size-full' src={LogoAneimera} />
        </figure>
        <div className='flex flex-row gap-3 items-center'>
          <a
            className='flex flex-row gap-3 items-center border-r-2 
            border-slate-900/80 pr-3 sm:pr-5 mr-1 sm:mr-3 py-1.5 cursor-pointer group'
            href='https://aneimera-upc-demo.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <WebsiteIcon />
            <span className='text-lg group-hover:underline hidden md:block'>
              www.aneimeraupc.com.pe
            </span>
          </a>
          <button
            className='flex flex-row gap-3 items-center bg-red-600 px-4 py-3 rounded-xl 
            hover:bg-red-800 transition-all duration-300'
            onClick={() => signOut()}
          >
            <span className='tracking-wide text-white whitespace-nowrap block md:hidden'>
              Salir
            </span>
            <span className='tracking-wide text-white whitespace-nowrap hidden md:block'>
              Cerrar sesión
            </span>
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
