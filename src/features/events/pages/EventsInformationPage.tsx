import { CirclePlusIcon } from "../../../assets/icons/CirclePlusIcon";
import { ActionItem } from "../components/ActionItem";
import EventBanner from "../../../assets/images/main-banner.png";
import { EventsTable } from "../components/ui/EventsTable";
import { useNavigate } from "react-router-dom";

export const EventsInformationPage = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => navigate(path);

  return (
    <>
      <figure className='relative w-full aspect-[9/7] xs:aspect-[9/6] md:aspect-[12/4]'>
        <img src={EventBanner} className='size-full bg-cover' />
        <div className='absolute inset-0 bg-black opacity-30'></div>
        <div
          className='absolute bottom-0 left-1/2 z-10 transform -translate-x-1/2 
             w-full md:w-auto h-full sm:h-auto 
             flex items-center justify-center md:block 
             bg-black bg-opacity-75 
             py-8 md:py-12 lg:py-16 
             md:px-8 lg:px-20 
             rounded-t-[0px] md:rounded-t-[80px]'
        >
          <div className='flex flex-col gap-8 lg:gap-12 items-center text-center'>
            <h1 className='text-2xl xs:text-3xl md:text-4xl uppercase tracking-wide font-semibold text-blanco'>
              Registro de eventos
            </h1>
            <ul className='flex flex-col sm:flex-row justify-between gap-6 sm:gap-8 md:gap-12 lg:gap-16'>
              <ActionItem caption='Crear evento' />
              <ActionItem caption='Actualizar evento' />
              <ActionItem caption='Eliminar evento' />
            </ul>
          </div>
        </div>
      </figure>
      <div className='section-container py-12 sm:py-16'>
        <div className='flex flex-col sm:flex-row items-center justify-between flex-wrap gap-5'>
          <h3 className='text-2xl sm:text-3xl text-[#C42626] font-semibold text-center sm:text-start leading-relaxed'>
            Informacion de registros
          </h3>
          <button
            className='flex flex-row gap-3 items-center bg-slate-900 px-5 py-3 rounded-xl 
      hover:bg-slate-950 hover:scale-[1.03] transition-all duration-300 whitespace-nowrap order-2 sm:order-1'
            onClick={() => navigateTo("/event-register")}
          >
            <span className='tracking-wide text-white'>Crear evento</span>
            <CirclePlusIcon />
          </button>
        </div>
        <p className='text-slate-800/90 text-base sm:text-lg mt-5 leading-relaxed text-center sm:text-start text-pretty order-1 sm:order-2'>
          En la siguiente tabla podrás visualizar el registro de ponencias
          programadas, realiza las modificaciones pertinentes para hacer un
          seguimiento de proximos eventos{" "}
        </p>
        <EventsTable />
      </div>
    </>
  );
};
