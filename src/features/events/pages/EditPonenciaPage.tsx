import { FormEvent, useState } from "react";
import EventBanner from "../../../assets/images/event-banner-aneimera.webp";
import { Ponencia } from "../model/ponencia";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { PonenciaService } from "../service/ponencia.service";
import { formatDate, today } from "../../../shared/helpers/date-format";
import { ErrorUpdateEventDialog } from "../components/ErrorUpdateEventDialog";
import { SuccessfullUpdateEventDialog } from "../components/SuccessfullUpdateEventDialog";
import { PonenciaPreviewDialog } from "../components/PonenciaPreviewDialog";

export const EditPonenciaPage = () => {
  const location = useLocation();
  const event = location.state?.event as Ponencia;
  const navigate = useNavigate();

  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const ponenciaService = new PonenciaService();

  // manejamos los campos del formulario
  const initialFormData: Ponencia = {
    ponenciaId: event.ponenciaId,
    titulo: event.titulo,
    misionObjetivo: event.misionObjetivo,
    descripcion: event.descripcion,
    fecha: formatDate(event.fecha),
    hora: event.hora,
    aforo: event.aforo,
    modalidad: event.modalidad,
    enlace: event.enlace,
    rutaImagen: event.rutaImagen,
  };

  // campos requeridos
  const requiredFields: (keyof Ponencia)[] = [
    "titulo",
    "misionObjetivo",
    "descripcion",
    "fecha",
    "hora",
    "aforo",
    "modalidad",
    "enlace",
  ];

  const { formData, handleInputChange, allFieldsFilled } = useForm(
    initialFormData,
    requiredFields
  );

  const handleSubmitUpdatePonencia = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await ponenciaService.updatePonencia(formData);
      console.log("Ponencia actualizada correctamente: ", response);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error al crear ponencia", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorUpdateDialogClose = () => {
    setHasError(false);
  };

  const handleSuccessUpdateDialogClose = () => {
    setIsSuccess(false);
  };

  const handleCancel = () => {
    navigate("/events-information");
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
        <div className='flex flex-col items-center md:items-start gap-5'>
          <h3 className='text-2xl sm:text-3xl text-[#C42626] font-semibold text-center sm:text-start leading-relaxed'>
            Editar Ponencia
          </h3>
          <p className='text-gray-700'>
            Utiliza el siguiente formulario para actualizar una ponencia ya
            existente.
          </p>
        </div>

        <div className='flex flex-col justify-center mx-auto mt-8 rounded-xl overflow-hidden shadow-xl border-[1.5px] border-slate-300'>
          {/* Formulario para crear ponencias */}
          <form
            onSubmit={handleSubmitUpdatePonencia}
            className='bg-white p-6 rounded border-black'
          >
            {/* Title and Description in the same row */}
            <div className='flex md:flex-row flex-col gap-8 mt-2'>
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
              <div className='flex-1'>
                <label className='block text-gray-700'>
                  Misión y objetivo*
                </label>
                <input
                  type='text'
                  name='misionObjetivo'
                  value={formData.misionObjetivo}
                  onChange={handleInputChange}
                  className='w-full bg-gray-100 px-3 py-3 shadow-md  rounded'
                />
              </div>
            </div>
            <div className='flex-1 h-32 mb-8'>
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
                    <label className='block text-gray-700 mt-6'>Fecha*</label>
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
                    <label className='block text-gray-700 mt-6'>Hora*</label>
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
            </div>

            <div className='flex flex-col md:flex-row gap-5 mt-8'>
              <button
                type='button'
                onClick={handlePreview}
                className={`w-full flex-1 px-4 py-2.5 rounded text-xl font-medium transition-all duration-200 ease-linear ${
                  !allFieldsFilled
                    ? "bg-gray-200 cursor-not-allowed text-slate-600"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                disabled={!allFieldsFilled}
              >
                Previsualizar evento
              </button>
              <button
                className='flex-1 w-full px-4 py-2.5 rounded text-sm font-medium 
                  transition-all duration-200 ease-linear lg:text-xl 
                bg-gray-500 hover:bg-gray-600 text-white'
                type='button'
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                type='submit'
                className={`flex-1 w-full px-4 py-2.5 rounded text-lg font-medium transition-all 
                  duration-200 ease-linear lg:text-xl ${
                    !allFieldsFilled
                      ? "bg-gray-200 cursor-not-allowed text-slate-600"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                disabled={!allFieldsFilled}
              >
                Actualizar Evento
              </button>
            </div>
            <h6 className='flex text-[12px] text-left mt-3'>
              * Los campos son obligatorios
            </h6>

            {/* muestra el dialogo de error si el estado es true */}
            {hasError && (
              <ErrorUpdateEventDialog
                title='ponencia'
                onClose={handleErrorUpdateDialogClose}
              />
            )}

            {/* muestra el dialogo de creacion correcta si el estado es true */}
            {isSuccess && (
              <SuccessfullUpdateEventDialog
                title='ponencia'
                onClose={handleSuccessUpdateDialogClose}
              />
            )}

            {/* muestra el dialogo de previsualización si el estado es true */}
            {showPreview && (
              <PonenciaPreviewDialog
                ponencia={formData}
                onClose={() => setShowPreview(false)}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
