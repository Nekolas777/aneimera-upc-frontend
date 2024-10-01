import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import LogoAneimera from "../../assets/images/aneimera-logo.png";
import { WebsiteIcon } from "../../assets/icons/WebsiteIcon";

export const NavigationBar = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => navigate(path);

  return (
    /* sticky top-0 z-50 consider this for topbar flexible in <header> */
    <header className='bg-gray-200/80'>
      <div className='section-container h-full flex items-center justify-between'>
        <figure className='w-44 cursor-pointer'>
          <img className='size-full' src={LogoAneimera} />
        </figure>
        <div className='flex flex-row gap-3 items-center'>
          <a
            className='flex flex-row gap-2 items-center border-r-2 
            border-slate-900/80 pr-5 mr-3 py-1.5 cursor-pointer group'
            href="https://aneimera-upc.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WebsiteIcon />
            <span className="text-lg group-hover:underline">www.aneimeraupc.com.pe</span>
          </a>
          <button
            className='flex flex-row gap-3 items-center bg-red-600 px-5 py-3 rounded-xl 
            hover:bg-red-800 transition-all duration-300'
            onClick={() => navigateTo("/")}
          >
            <span className='tracking-wide text-white'>Cerrar sesión</span>
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
