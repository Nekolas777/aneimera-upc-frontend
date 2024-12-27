import { ErrorIcon } from "../../../assets/icons/ErrorIcon";
import { formatText } from "../../../shared/helpers/format-text";

interface ErrorCreateEventDialogProps {
  title: string;
  onClose: () => void;
}

export const ErrorCreateEventDialog = ({ title, onClose }: ErrorCreateEventDialogProps) => {

  const { article, adjective } = formatText(title);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded shadow-lg flex flex-col'>
        <div className="flex items-center justify-center">
          <ErrorIcon />
        </div>
        <h2 className='text-2xl font-semibold text-center mt-6'>Algo salió mal</h2>
        <p className="text-center text-slate-700 leading-loose mt-5">Hubo un error al crear {article} {adjective} <strong>{title}</strong>.<br/>Por favor, inténtalo de nuevo</p>
        <button
          onClick={onClose}
          className='mt-6 bg-red-500 text-white px-4 py-2 rounded 
           hover:bg-red-600 transition duration-200'
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};