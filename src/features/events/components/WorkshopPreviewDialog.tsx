import { useEffect } from "react";
import { CloseIcon } from "../../../assets/icons/CloseIcon";
import { ExternalIcon } from "../../../assets/icons/ExternalIcon";
import { Taller } from "../model/taller";

interface WorkshopPreviewDialogProps {
  workshop: Taller;
  fileBanner?: File | null;
  fileExpositor?: File | null;
  onClose: () => void;
}

export const WorkshopPreviewDialog = ({
  workshop,
  fileBanner,
  fileExpositor,
  onClose,
}: WorkshopPreviewDialogProps) => {
  const getImageSrc = (rutaImagen: string, file?: File | null) => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return `http://aneimeraupc.somee.com${rutaImagen}`;
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 py-10'>
      <div className='relative p-8 bg-white w-11/12 max-w-[750px] max-h-[800px] overflow-y-auto'>
        <button
          className='absolute top-0 right-0 bg-red-500 hover:bg-red-600 transition-all duration-200 ease-linear p-2'
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <div className='workshop-card w-full flex flex-col bg-slate-200'>
          <figure>
            <img
              className='w-full h-[320px] object-fill'
              src={getImageSrc(workshop.rutaImagen, fileBanner)}
              alt={`Imagen del taller ${workshop.titulo}`}
            />
          </figure>
          <div className='flex flex-col p-5 h-full'>
            <div className='flex flex-col gap-3 h-full'>
              <div className='flex flex-row justify-between items-center gap-5'>
                <h2
                  className='font-medium workshop-title flex-1 cursor-default text-xl'
                  data-title={workshop.titulo}
                  title={workshop.titulo}
                >
                  {workshop.titulo}
                </h2>
                <p className='text-sm cursor-default'>
                  <span
                    className='font-medium mr-1.5'
                    style={{ fontSize: "17px" }}
                  >
                    Fecha:
                  </span>
                  {workshop.fecha}
                </p>
              </div>
              <p
                className='description cursor-default py-1 tracking-wide leading-relaxed text-sm md:text-base text-slate-900'
                style={{ lineHeight: "1.65" }}
              >
                {workshop.descripcion}
              </p>
              <div className='flex-grow'></div>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-3'>
                  <img
                    className='rounded-full w-[3.5rem] h-[3.5rem] border-[1px]'
                    src={getImageSrc(
                      workshop.expositorRutaImagen,
                      fileExpositor
                    )}
                    alt={`Imagen del expositor ${workshop.expositorNombre}`}
                  />
                  <div className='flex flex-col justify-center gap-1'>
                    <h3 className='font-normal'>{workshop.expositorNombre}</h3>
                    <span className='text-[13px] tracking-wide text-slate-500'>
                      {workshop.expositorRol}
                    </span>
                  </div>
                </div>
                <a
                  href={workshop.enlace}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Abrir formulario del taller ${workshop.titulo}`}
                  className='cursor-pointer'
                >
                  <ExternalIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
