import { useNavigate } from "react-router-dom";
import { SuccessIcon } from "../../../assets/icons/SuccessIcon";
import { formatText } from "../../../shared/helpers/format-text";

interface SuccessfullUpdateEventDialogProps {
  title: string;
  onClose: () => void;
}

export const SuccessfullUpdateEventDialog = ({ title }: SuccessfullUpdateEventDialogProps) => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => navigate(path);

  const { article, adjective } = formatText(title);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded shadow-lg flex flex-col'>
        <div className="flex items-center justify-center">
          <SuccessIcon />
        </div>
        <h2 className='text-2xl font-semibold text-center mt-6'>Evento actualizado</h2>
        <p className="text-center text-slate-700 leading-loose mt-5">Se ha actualizado {article} {adjective} <strong>{title}</strong>.<br/>Ve a la sección principal para más detalles</p>
        <button
          onClick={() => navigateTo('/events-information')}
          className='mt-6 bg-green-500 text-white font-medium px-4 py-2 rounded 
           hover:bg-green-600 transition duration-200'
        >
          Ir a información de eventos
        </button>
      </div>
    </div>
  );
};