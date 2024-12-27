import { formatText } from "../../../shared/helpers/format-text";
import { WarningIcon } from "../../../assets/icons/WarningIcon";

interface ConfirmDeleteEventDialogProps {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDeleteEventDialog = ({ title, onClose, onConfirm }: ConfirmDeleteEventDialogProps) => {

  const { article, adjective } = formatText(title);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded shadow-lg flex flex-col'>
        <div className="flex items-center justify-center">
          <WarningIcon />
        </div>
        <h2 className='text-2xl font-semibold text-center mt-6'>Confirmar eliminación</h2>
        <p className="text-center text-slate-700 leading-loose mt-5">¿Estás seguro de que deseas eliminar {article} {adjective} <strong>{title}</strong>? Esta acción no se puede deshacer.</p>
        <div className='flex flex-row-reverse gap-5 justify-center mt-6'>
          <button
            onClick={onConfirm}
            className='bg-red-500 text-white font-medium px-4 py-2 rounded 
             hover:bg-red-600 transition duration-200'
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className='bg-gray-500 text-white font-medium px-4 py-2 rounded 
             hover:bg-gray-600 transition duration-200'
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};