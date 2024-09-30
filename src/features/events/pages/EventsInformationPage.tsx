import { CirclePlusIcon } from "../../../assets/icons/CirclePlusIcon";
import { ActionItem } from "../components/ActionItem";
import EventBanner from "../../../assets/images/main-banner.png";
import { EventsTable } from "../components/ui/EventsTable";

export const EventsInformationPage = () => {
  return (
    <>
      <figure className='relative w-full aspect-[12/4]'>
        <img src={EventBanner} className='size-full bg-cover' />
        <div className='absolute inset-0 bg-black opacity-30'></div>
        <div
          className='px-20 py-16 bg-black bg-opacity-75 absolute z-10 bottom-0 
          left-1/2 transform -translate-x-1/2 rounded-t-[80px]'
        >
          <div className='flex flex-col gap-12 items-center'>
            <h1 className='text-4xl uppercase tracking-wide font-semibold text-blanco'>
              Registro de eventos
            </h1>
            <ul className='flex flex-row justify-between gap-16'>
              <ActionItem caption='Crear evento' />
              <ActionItem caption='Actualizar evento' />
              <ActionItem caption='Eliminar evento' />
            </ul>
          </div>
        </div>
      </figure>
      <div className='section-container py-16'>
        <div className='flex flex-row items-center justify-between'>
          <h3 className='text-3xl text-[#C42626] font-semibold'>
            Informacion de registros
          </h3>
          <button
            className='flex flex-row gap-3 items-center bg-slate-900 px-5 py-3 rounded-xl 
            hover:bg-slate-950 hover:scale-[1.03] transition-all duration-300'
          >
            <span className='tracking-wide text-white'>Crear evento</span>
            <CirclePlusIcon />
          </button>
        </div>
        <p className="text-slate-800/90 text-lg mt-5 leading-relaxed text-pretty">
          En la siguiente tabla podrás visualizar el registro de ponencias
          programadas, realiza las modificaciones pertinentes para hacer un
          seguimiento de proximos eventos{" "}
        </p>
        <EventsTable/>
      </div>
    </>
  );
};
