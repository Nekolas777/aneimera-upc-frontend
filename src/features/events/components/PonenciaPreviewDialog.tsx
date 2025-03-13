import { CloseIcon } from "../../../assets/icons/CloseIcon";
import { Ponencia } from "../model/ponencia";
import MisionObjetivoPlaceholder from '../../../assets/images/ponencia11.webp';
import { useEffect } from "react";

interface PonenciaPreviewDialogProps {
  ponencia: Ponencia;
  file?: File | null;
  onClose: () => void;
}

export const PonenciaPreviewDialog = ({
  ponencia,
  file,
  onClose,
}: PonenciaPreviewDialogProps) => {

  const getImageSrc = (rutaImagen: string, file?: File | null) => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return `http://aneimeraupc.somee.com${rutaImagen}`;
  };

  // this useEffect is used to disable the scroll of the body when the dialog is open
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [])
  

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 py-10'>
      <section className='relative p-5 bg-white w-11/12 max-w-[1400px] max-h-[800px] h-full overflow-y-auto'>
        <button className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 transition-all duration-200 ease-linear p-2" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className='flex flex-col gap-8'>
          {ponencia && (
            <div className='grid grid-rows-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-[4fr,3fr] gap-5 md:gap-10'>
              <div
                className='flex flex-col gap-5 md:gap-6 bg-blanco py-5 pr-0 md:pr-8 md:py-10
                text-center sm:text-start'
              >
                <h2 className='uppercase font-semibold tracking-wide text-xl sm:text-2xl'>
                  {ponencia.titulo}
                </h2>
                <p
                  className='tracking-wide text-wrap text-normal md:text-lg'
                  style={{ lineHeight: 2 }}
                >
                  {ponencia.descripcion}
                </p>
                <a
                  href={ponencia.enlace}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Ir a la publicacion de Facebook de EMA'
                  className='px-4 py-2 bg-red-700 text-white text-lg self-center sm:self-start mt-2
                hover:bg-red-800 transition-all duration-200 ease'
                >
                  Más información
                </a>
              </div>
              <div className='w-full h-full flex items-center'>
                <img
                  src={getImageSrc(ponencia.rutaImagen!, file)}
                  alt='ponencia-uno-image'
                  className='object-fill h-96 w-full'
                />
              </div>
            </div>
          )}
          {ponencia && (
            <div className='grid grid-rows-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-[3fr,4fr] gap-5 md:gap-10 mt-5'>
              <div className='order-2 md:order-1 w-full h-full flex items-center'>
                <img
                  src={MisionObjetivoPlaceholder}
                  alt='ponencia-dos-image'
                  className='object-fill h-96 w-full'
                />
              </div>
              <div
                className='order-1 md:order-2 flex flex-col gap-6 md:gap-8 bg-blanco py-5 pl-0 md:pl-8 md:py-10
                    text-center sm:text-start'
              >
                <h2 className='uppercase font-semibold tracking-wide text-xl sm:text-2xl'>
                  Misión y Objetivo
                </h2>
                <p
                  className='tracking-wide text-pretty leading-[1.9] text-normal md:text-lg'
                  style={{ lineHeight: 2 }}
                >
                  {ponencia.misionObjetivo}
                </p>
                <a
                  href='https://www.facebook.com/profile.php?id=61556567363828'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Ir a la publicacion de Facebook de Aneimera UPC'
                  className='px-4 py-2 bg-red-700 text-white text-lg mt-2 self-center sm:self-start
                hover:bg-red-800 transition-all duration-200 ease'
                >
                  Más información
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
