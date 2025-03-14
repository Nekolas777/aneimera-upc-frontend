import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Visita } from "../model/visita";
import { VisitaService } from "../service/visita.service";
import EventBanner from "../../../assets/images/event-banner-aneimera.webp";
import EventImagePlaceholder from "../../../assets/images/image-event-placeholder.jpg";
import { useForm } from "../hooks/useForm";
import { ErrorCreateEventDialog } from "../components/ErrorCreateEventDialog";
import { SuccessfullCreateEventDialog } from "../components/SuccessfullCreateEventDialog";
import { TechnicalVisitPreviewDialog } from "../components/TechnicalVisitPreviewDialog";
import { today } from "../../../shared/helpers/date-format";

export const RegisterTechnicalVisitPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // para manejar el archivo cargado de local
  const fileInput = useRef<HTMLInputElement>(null);

  const visitaService = new VisitaService();

  // manejamos los campos del formulario
  const initialFormData: Visita = {
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    aforo: 0,
    modalidad: "Presencial",
    enlace: "",
    estado: false,
    rutaImagen: "imagenes/ejemplo/mi_imagen.jpg",
  };

  // campos requeridos
  const requiredFields: (keyof Visita)[] = [
    "titulo",
    "descripcion",
    "fecha",
    "hora",
    "aforo",
    "modalidad",
    "enlace",
  ];

  // custom hook for manage fields validation and data-binding
  const { formData, handleInputChange, allFieldsFilled } = useForm(
    initialFormData,
    requiredFields
  );

  const handleContainerClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };

    reader.readAsDataURL(file);

    console.log(file);
  };

  const handleSubmitVisita = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const file = fileInput.current?.files?.[0];
    if (!file) {
      alert("No file selected");
      setIsLoading(false);
      return;
    }

    try {
      const response = await visitaService.createVisita(formData, file);
      console.log("Visita creada correctamente: ", response);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error al crear visita", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorDialogClose = () => {
    setHasError(false);
  };

  const handleSuccessDialogClose = () => {
    setIsSuccess(false);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className='w-full font-poppins'>
      {/* Loader for http requests */}
      {isLoading && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='loader'></div>
        </div>
      )}

      {/* Banner */}
      <div className='w-full aspect-[9/7] xs:aspect-[9/6] md:aspect-[12/4]'>
        <img src={EventBanner} alt='Banner' className='size-full bg-cover' />
      </div>

      <div className='section-container mx-auto py-12 md:py-16'>
        {/* Title and Description above form */}
        <div className='flex flex-col mb-6 items-center md:items-start gap-5'>
          <h3 className='text-2xl sm:text-3xl text-[#C42626] font-semibold text-center sm:text-start leading-relaxed'>
            Registro de eventos
          </h3>
          <p className='text-gray-700'>
            Utiliza el siguiente menú desplegable para escoger el tipo de evento
            que deseas crear: ponencia, taller o visita técnica.
          </p>
        </div>

        <div className='flex flex-col justify-center mx-auto mt-10 rounded-xl overflow-hidden shadow-xl'>
          {/* Dropdown Menu */}
          <div className='relative bg-slate-200 hover:bg-slate-300 transition-all duration-200'>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className='w-full px-8 py-4 text-lg text-left flex justify-between items-center shadow-md'
            >
              Formulario de Registro para Visita Tecnica
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`size-8 transform transition-transform duration-200 ${
                  showDropdown ? "rotate-180" : "rotate-0"
                }`}
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.242 4.242a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {showDropdown && (
              <div className='absolute w-full bg-white border rounded shadow-lg'>
                <Link
                  to='/event-register'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                >
                  Formulario de Registro para Ponencia
                </Link>
                <Link
                  to='/workshop-register'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                >
                  Formulario de Registro para Taller
                </Link>
              </div>
            )}
          </div>

          {/* Formulario para crear visitas tèncnicas */}
          <form
            onSubmit={handleSubmitVisita}
            className='bg-white p-6 rounded border-black'
          >
            {/* Title and Description in the same row */}
            <div className='flex md:flex-row flex-col gap-8 mt-2'>
              {" "}
              {/* md flex */}
              <div className='flex-1'>
                <label className='block text-gray-700'>Título*</label>
                <input
                  type='text'
                  name='titulo'
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className='w-full px-3 py-3 bg-gray-100 shadow-md rounded'
                />
              </div>
            </div>
            <div className='flex-1 h-32 mb-8'>
              {" "}
              {/* Incrementar altura */}
              <label className='block text-gray-700 my-1 mt-6'>
                Descripción*
              </label>
              <textarea
                name='descripcion'
                value={formData.descripcion}
                onChange={handleInputChange}
                className='w-full h-full bg-gray-100 px-3 py-2 shadow-md rounded'
              ></textarea>
            </div>

            <div className='flex flex-col md:flex-row md:space-x-8 overflow-hidden'>
              {/* Remaining Inputs */}
              <div className='flex-col gap-4 w-full flex-1 flex-grow'>
                <div className='flex md:flex-row flex-col md:space-x-6'>
                  <div className='flex-1'>
                    <label className='block text-gray-700 mt-6'>Fecha</label>
                    <input
                      type='date'
                      name='fecha'
                      value={formData.fecha}
                      onChange={handleInputChange}
                      className='w-full bg-gray-100 px-3 py-3 shadow-md  rounded'
                      min={today}
                    />
                  </div>
                  <div className='flex-1'>
                    <label className='block text-gray-700 mt-6'>Hora</label>
                    <input
                      type='time'
                      name='hora'
                      value={formData.hora}
                      onChange={handleInputChange}
                      className='w-full bg-gray-100 px-3 py-3 shadow-md  rounded'
                    />
                  </div>
                </div>

                <div className='flex md:flex-row flex-col md:space-x-6'>
                  <div className='flex-1'>
                    <label className='block text-gray-700 mt-6'>Aforo</label>
                    <input
                      type='number'
                      name='aforo'
                      value={formData.aforo}
                      onChange={handleInputChange}
                      className='w-full bg-gray-100 px-3 py-3 shadow-md rounded'
                    />
                  </div>
                  <div className='flex-1'>
                    <label className='block text-gray-700 mt-6'>
                      Modalidad
                    </label>
                    <select
                      name='modalidad'
                      value={formData.modalidad}
                      onChange={handleInputChange}
                      className='w-full bg-gray-100 px-3 py-3 shadow-md  rounded'
                    >
                      <option value='presencial'>Presencial</option>
                      <option value='virtual'>Virtual</option>
                    </select>
                  </div>
                </div>

                <div className='flex-1'>
                  <label className='block text-gray-700 mt-6'>
                    Enlace de publicación*
                  </label>
                  <input
                    type='url'
                    name='enlace'
                    value={formData.enlace}
                    onChange={handleInputChange}
                    className='w-full bg-gray-100 px-3 py-3 shadow-md  rounded'
                  />
                </div>
              </div>

              {/* Image and Other Fields in Columns */}
              <div className='flex flex-col md:flex-row w-full flex-1 h-64'>
                <div className='flex-1'>
                  <label className='block text-gray-700 mt-6'>
                    Banner Imagen*
                  </label>
                  <div
                    className='relative h-full cursor-pointer'
                    onClick={handleContainerClick}
                  >
                    <img
                      className='h-full w-full relative z-10'
                      src={selectedImage || EventImagePlaceholder}
                      alt='event-image-form'
                    />
                    <div
                      className='absolute inset-0 z-20 bg-black opacity-0 
              hover:opacity-20 transition-opacity duration-300'
                    ></div>
                    <input
                      type='file'
                      ref={fileInput}
                      className='hidden'
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row mt-8 gap-5'>
              <button
                type='button'
                onClick={handlePreview}
                className={`w-full flex-1 px-4 py-2.5 rounded text-lg sm:text-xl font-medium transition-all duration-200 ease-linear ${
                  !allFieldsFilled || !selectedImage
                    ? "bg-gray-200 cursor-not-allowed text-slate-600"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                disabled={!allFieldsFilled || !selectedImage}
              >
                Previsualizar evento
              </button>
              <button
                type='submit'
                className={`w-full flex-1 px-4 py-2.5 rounded text-lg sm:text-xl font-medium transition-all duration-200 ease-linear ${
                  !allFieldsFilled || !selectedImage
                    ? "bg-gray-200 cursor-not-allowed text-slate-600"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
                disabled={!allFieldsFilled || !selectedImage}
              >
                Crear Evento
              </button>
            </div>
            <h6 className='flex text-[12px] text-left mt-3'>
              * Los campos son obligatorios
            </h6>

            {/* muestra el dialogo de error si el estado es true */}
            {hasError && (
              <ErrorCreateEventDialog
                title='visita'
                onClose={handleErrorDialogClose}
              />
            )}

            {/* muestra el dialogo de creacion correcta si el estado es true */}
            {isSuccess && (
              <SuccessfullCreateEventDialog
                title='visita'
                onClose={handleSuccessDialogClose}
              />
            )}

            {/* muestra el dialogo de previsualización si el estado es true */}
            {showPreview && (
              <TechnicalVisitPreviewDialog
                visit={formData}
                file={fileInput.current?.files?.[0] || null}
                onClose={() => setShowPreview(false)}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
