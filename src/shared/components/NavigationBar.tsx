import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { WhatsappIcon } from "../../assets/icons/WhatsappIcon";
import LogoAneimera from "../../assets/images/aneimera-logo.png";

export const NavigationBar = () => {
  return (
    /* sticky top-0 z-50 considere this for topbar flexible */
    <header className='bg-gray-200/80'>
      <div className='section-container h-full flex items-center justify-between'>
        <figure className='w-44 cursor-pointer'>
          <img className='size-full' src={LogoAneimera} />
        </figure>
        <div className='flex flex-row gap-3 items-center'>
          <div
            className='flex flex-row gap-2 items-center border-r-2 
            border-slate-900/80 pr-5 mr-3 py-1.5'
          >
            <WhatsappIcon />
            <span>+ 51 972 829 123</span>
          </div>
          <button
            className='flex flex-row gap-3 items-center bg-red-600 px-5 py-3 rounded-xl 
            hover:bg-red-800 transition-all duration-300'
          >
            <span className='tracking-wide text-white'>
              Cerrar sesión
            </span>
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
