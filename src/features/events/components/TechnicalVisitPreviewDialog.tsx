import { useEffect } from "react";
import { CalendarIcon } from "../../../assets/icons/CalendarIcon";
import { CloseIcon } from "../../../assets/icons/CloseIcon";
import { Visita } from "../model/visita";
import { environment } from "../../../public/environment";

interface TechnicalVisitPreviewDialogProps {
  visit: Visita;
  file?: File | null;
  onClose: () => void;
}

export const TechnicalVisitPreviewDialog = ({ visit, file, onClose }: TechnicalVisitPreviewDialogProps) => {
  const getImageSrc = (rutaImagen: string, file?: File | null, ) => {
    if (file) {
      return URL.createObjectURL(file);
    }

    return `${environment.base}${rutaImagen}`
  };

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [])

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 py-10'>
      <div className='relative p-10 bg-white w-11/12 max-w-[750px] max-h-[800px] overflow-y-auto'>
        <button
          className='absolute top-0 right-0 bg-red-500 hover:bg-red-600 transition-all duration-200 ease-linear p-2'
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <article className='w-full flex flex-col bg-slate-200'>
          <div>
            <img
              className='w-full h-[22rem] object-cover sm:object-fill'
              src={getImageSrc(visit.rutaImagen!, file)}
              alt={`Imagen de la visita técnica ${visit.titulo}`}
              onError={(e) => {
                e.currentTarget.src = "/aneimera-upc.jpg";
              }}
            />
          </div>
          <div className='flex flex-col py-6 px-5'>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-row justify-between items-center gap-5'>
                <h2 className='font-medium workshop-title text-xl'>{visit.titulo}</h2>
                <p className='text-sm'>
                  <span className='font-medium mr-1.5' style={{ fontSize: '17px' }}>Fecha:</span>
                  {visit.fecha}
                </p>
              </div>
              <p
                className='description font-normal text-sm md:text-base py-1 tracking-wide text-wrap
                    leading-relaxed text-slate-900 break-words'
                style={{ lineHeight: '1.65' }}
              >
                {visit.descripcion}
              </p>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-3'>
                  <a
                    href={visit.enlace}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Ir a la pagina de Facebook de Aneimera UPC'
                    className='px-4 py-2 bg-red-700 text-white text-lg mt-2 self-center sm:self-start
                    hover:bg-red-800 transition-all duration-200 ease'
                  >
                    Más información
                  </a>
                </div>
                <div
                  className='calendar-btn cursor-pointer bg-[#3C3737] p-2 rounded-full
                    hover:bg-black transition-all duration-200 ease-in'
                  data-visit-date={visit.fecha}
                  data-visit-title={visit.titulo}
                >
                  <CalendarIcon />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};