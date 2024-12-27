import { useNavigate } from "react-router-dom";
import { ErrorIcon } from "../../../assets/icons/ErrorIcon";
import { formatText } from "../../../shared/helpers/format-text";

interface ErrorUpdateEventDialogProps {
  title: string;
  onClose: () => void;
}

export const ErrorUpdateEventDialog = ({ title, onClose }: ErrorUpdateEventDialogProps) => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => navigate(path);

  const { article, adjective } = formatText(title);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded shadow-lg flex flex-col'>
        <div className="flex items-center justify-center">
          <ErrorIcon />
        </div>
        <h2 className='text-2xl font-semibold text-center mt-6'>Error al actualizar el evento</h2>
        <p className="text-center text-slate-700 leading-loose mt-5">Hubo un problema al actualizar {article} {adjective} <strong>{title}</strong>.<br/>Por favor, inténtalo de nuevo más tarde.</p>
        <button
          onClick={() => navigateTo('/events-information')}
          className='mt-6 bg-red-500 text-white font-medium px-4 py-2 rounded 
           hover:bg-red-600 transition duration-200'
        >
          Ir a información de eventos
        </button>
        <button
          onClick={onClose}
          className='mt-2 bg-gray-500 text-white font-medium px-4 py-2 rounded 
           hover:bg-gray-600 transition duration-200'
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};