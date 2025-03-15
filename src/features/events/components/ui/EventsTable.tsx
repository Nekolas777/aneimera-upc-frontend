import { ChangeEvent, useState, useEffect } from "react";
import { ArrowIcon } from "../../../../assets/icons/ArrowIcon";
import { TrashIcon } from "../../../../assets/icons/TrashIcon";
import { EditIcon } from "../../../../assets/icons/EditIcon";
import { GeneralService } from "../../service/general.service";
import { RequestEvento } from "../../model/requestevento";
import { Eventos } from "../../model/eventos";
import { PonenciaService } from "../../service/ponencia.service";
import { TallerService } from "../../service/taller.service";
import { VisitaService } from "../../service/visita.service";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Visita } from "../../model/visita";
import { Taller } from "../../model/taller";
import { Ponencia } from "../../model/ponencia";
import { ConfirmDeleteEventDialog } from "../ConfirmDeleteEventDialog";
import { isIdDisabled } from "../../../../shared/helpers/disableIds";

export const EventsTable = () => {
  const generalservice = new GeneralService();
  const ponenciaservice = new PonenciaService();
  const tallerservice = new TallerService();
  const visitaservice = new VisitaService();
  const navigate = useNavigate();

  const [response, setResponse] = useState<Eventos | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

  // states for managing when user will delete a event
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [deleteEventType, setDeleteEventType] = useState<string | null>(null);

  const [formData, setFormData] = useState<RequestEvento>({
    Ponencia: true,
    Taller: true,
    VisitaTecnica: true,
    page: 1,
    size: 10,
  });

  const fetchEventos = async () => {
    try {
      setIsLoadingEvents(true);
      const response = await generalservice.geteventos(formData);
      setResponse(response.eventos);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, [formData]);

  const [typeFilter, setTypeFilter] = useState("");

  const handleNextPage = () => {
    if (response?.last == false) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        page: prevFormData.page + 1,
      }));
    }
  };

  const handlePreviousPage = () => {
    if (formData.page != 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        page: prevFormData.page - 1,
      }));
    }
  };

  const handleSelectedOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      page: 1,
      size: newSize,
    }));
  };

  const handleEdit = async (
    ponenciaId?: number,
    tallerId?: number,
    visitaTecnicaId?: number
  ) => {
    if (
      isIdDisabled(ponenciaId) ||
      isIdDisabled(tallerId) ||
      isIdDisabled(visitaTecnicaId)
    ) {
      alert("Este evento no puede ser editado");
      return;
    }

    setIsLoading(true);
    let eventData: Ponencia | Taller | Visita | null = null;
    let eventId: number | undefined;
    let eventType: string | undefined;

    try {
      if (ponenciaId != null) {
        eventData = await ponenciaservice.getPonenciaById(ponenciaId);
        eventId = ponenciaId;
        eventType = "presentation"; // ponencia
      } else if (tallerId != null) {
        eventData = await tallerservice.getTallerById(tallerId);
        eventId = tallerId;
        eventType = "workshop";
      } else if (visitaTecnicaId != null) {
        eventData = await visitaservice.getVisitaById(visitaTecnicaId);
        eventId = visitaTecnicaId;
        eventType = "technical-visite";
      }

      if (eventData && eventId != null && eventType) {
        navigate(`/${eventType}/edit/${eventId}`, {
          state: { event: eventData },
        });
      }
    } catch (error) {
      console.error("Error fetching event data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (
    ponenciaId?: number,
    tallerId?: number,
    visitaTecninaId?: number
  ) => {
    if (
      isIdDisabled(ponenciaId) ||
      isIdDisabled(tallerId) ||
      isIdDisabled(visitaTecninaId)
    ) {
      alert("Este evento no puede ser eliminado");
      return;
    }

    if (ponenciaId != null) {
      setDeleteEventId(ponenciaId);
      setDeleteEventType("ponencia");
    } else if (tallerId != null) {
      setDeleteEventId(tallerId);
      setDeleteEventType("taller");
    } else if (visitaTecninaId != null) {
      setDeleteEventId(visitaTecninaId);
      setDeleteEventType("visita");
    }
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    setShowDeleteDialog(false);
    setIsLoading(true);

    try {
      if (deleteEventType === "ponencia" && deleteEventId != null) {
        await ponenciaservice.deletePonencia(deleteEventId);
      } else if (deleteEventType === "taller" && deleteEventId != null) {
        await tallerservice.deleteTaller(deleteEventId);
      } else if (deleteEventType === "visita" && deleteEventId != null) {
        await visitaservice.deleteVisita(deleteEventId);
      }

      window.location.reload();
    } catch (error) {
      alert(`Error al eliminar el evento: ${error}`);
    } finally {
      setIsLoading(false);
      setDeleteEventId(null);
      setDeleteEventType(null);
    }
  };

  // reset states
  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteEventId(null);
    setDeleteEventType(null);
  };

  const handleVisibility = async (
    index: number,
    ponenciaId?: number,
    tallerId?: number,
    visitaTecninaId?: number
  ) => {
    if (
      isIdDisabled(ponenciaId) ||
      isIdDisabled(tallerId) ||
      isIdDisabled(visitaTecninaId)
    ) {
      alert("Este evento no puede modificar su estado");
      return;
    }

    setIsLoading(true);
    try {
      if (ponenciaId != null) {
        await ponenciaservice.cambiarEstadoPonencia(ponenciaId);
      } else if (tallerId != null) {
        await tallerservice.cambiarEstadoTaller(tallerId);
      } else if (visitaTecninaId != null) {
        await visitaservice.cambiarEstadoVisita(visitaTecninaId);
      }

      // Si prevEventos es null o undefined, no hacemos nada
      setResponse((prevEventos) => {
        if (!prevEventos) return prevEventos;

        return {
          ...prevEventos,
          content: prevEventos.content.map((evento, i) =>
            i === index
              ? { ...evento, estado: evento.estado === false ? true : false }
              : evento
          ),
        };
      });
    } catch (error) {
      console.error("Error al cambiar el estado del evento", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filter: string) => {
    setTypeFilter(filter);

    setFormData((prevFormData) => {
      switch (filter) {
        case "":
          return {
            ...prevFormData,
            Ponencia: true,
            Taller: true,
            VisitaTecnica: true,
            page: 1,
          };
        case "Visita":
          return {
            ...prevFormData,
            Ponencia: false,
            Taller: false,
            VisitaTecnica: true,
            page: 1,
          };
        case "Ponencia":
          return {
            ...prevFormData,
            Ponencia: true,
            Taller: false,
            VisitaTecnica: false,
            page: 1,
          };
        case "Taller":
          return {
            ...prevFormData,
            Ponencia: false,
            Taller: true,
            VisitaTecnica: false,
            page: 1,
          };
        default:
          return prevFormData;
      }
    });
  };

  return (
    <div className='mt-10 min-w-full'>
      {/* Loader for http requests */}
      {isLoading && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='loader'></div>
        </div>
      )}
      <div className='mb-7 sm:mb-5 flex flex-wrap items-center gap-3.5'>
        <span className=''>Filtrar por:</span>
        <button
          onClick={() => handleFilterChange("")}
          className={`px-4 py-2 rounded ${
            typeFilter === ""
              ? "bg-red-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => handleFilterChange("Visita")}
          className={`px-4 py-2 rounded ${
            typeFilter === "Visita"
              ? "bg-red-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Visitas
        </button>
        <button
          onClick={() => handleFilterChange("Ponencia")}
          className={`px-4 py-2 rounded ${
            typeFilter === "Ponencia"
              ? "bg-red-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Ponencias
        </button>
        <button
          onClick={() => handleFilterChange("Taller")}
          className={`px-4 py-2 rounded ${
            typeFilter === "Taller"
              ? "bg-red-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Talleres
        </button>
      </div>
      {/* Table */}
      {isLoadingEvents ? (
        <div className='flex justify-center items-center py-4'>
          <span className='text-base xl:text-xl font-medium text-slate-700/80'>
            Cargando Eventos...
          </span>
        </div>
      ) : (
        <div className='contain-inline-size min-w-full overflow-x-auto'>
          <table className='events-table border-[1px] border-gray-300 w-full min-w-full text-left'>
            <thead className='bg-slate-800 text-white'>
              <tr className='text-center *:capitalize *:py-2.5'>
                <th className='px-5 sm:px-3.5'>N°</th>
                <th className='px-5 sm:px-3.5'>Título</th>
                <th className='px-5 sm:px-3.5'>Aforo</th>
                <th className='px-5 sm:px-3.5'>Modalidad</th>
                <th className='px-5 sm:px-3.5'>Tipo</th>
                <th className='px-5 sm:px-3.5'>Fecha</th>
                <th className='px-5 sm:px-3.5'>Hora</th>
                <th className='px-5 sm:px-3.5'>Estado</th>
                <th className='px-5 sm:px-3.5'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {response?.content.map((evento, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-slate-200/80" : "bg-slate-50"
                  } hover:text-red-800 text-center *:whitespace-nowrap ${
                    evento.ponenciaId === 1 ||
                    evento.ponenciaId === 2 ||
                    evento.tallerId === 1 ||
                    evento.tallerId === 2 ||
                    evento.visitaTecninaId === 1 ||
                    evento.visitaTecninaId === 2
                      ? "text-blue-800"
                      : ""
                  }`}
                >
                  <td>{index + 1 + (formData.page - 1) * formData.size}</td>
                  <td className='title-col' title={evento.titulo}>
                    {evento.titulo}
                  </td>
                  <td>{evento.aforo}</td>
                  <td>{evento.modalidad}</td>
                  <td>{evento.tipo}</td>
                  <td>{evento.fecha.toString().substring(0, 10)}</td>
                  <td>{evento.hora}</td>
                  <td>
                    <button
                      className={`p-1.5 rounded-lg transition-all duration-200 ease-linear ${
                        evento.estado == true ? "bg-green-600" : "bg-gray-600"
                      }`}
                      onClick={() =>
                        handleVisibility(
                          index,
                          evento.ponenciaId,
                          evento.tallerId,
                          evento.visitaTecninaId
                        )
                      }
                    >
                      {evento.estado == true ? (
                        <RiEyeLine className='size-5 text-slate-50' />
                      ) : (
                        <RiEyeOffLine className='size-5 text-slate-50' />
                      )}
                    </button>
                  </td>
                  <td className='flex flex-row gap-2 justify-center'>
                    <button
                      className='bg-blue-600 p-2 rounded-lg hover:bg-blue-800 transition-all duration-200 ease-linear'
                      onClick={() =>
                        handleEdit(
                          evento.ponenciaId,
                          evento.tallerId,
                          evento.visitaTecninaId
                        )
                      }
                    >
                      <EditIcon />
                    </button>
                    <button
                      className='bg-red-600 p-2 rounded-lg hover:bg-red-800 transition-all duration-200 ease-linear'
                      onClick={() =>
                        handleDelete(
                          evento.ponenciaId,
                          evento.tallerId,
                          evento.visitaTecninaId
                        )
                      }
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Navigation */}
      <footer className='w-full flex flex-row justify-between items-center mt-4'>
        <div className='flex flex-row items-center gap-3'>
          <p className='whitespace-nowrap hidden sm:block'>
            Eventos por página:
          </p>
          <div className='container'>
            <select
              onChange={(e) => {
                handleSelectedOptionChange(e);
              }}
              name='menu'
              id='menu-items'
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <span className='ml-2 text-slate-800/80 whitespace-nowrap'>
            {response && response.content
              ? `${Math.min(formData.size, response.content.length)} de ${
                  response.totalElements
                } eventos`
              : "Cargando eventos..."}
          </span>
        </div>
        <div className='flex flex-row items-center gap-2.5'>
          <button
            className='py-1.5 border-[1px] border-gray-300 flex flex-row items-center gap-1.5 px-2.5 disabled:opacity-50'
            disabled={formData.page == 1}
            onClick={() => {
              handlePreviousPage();
            }}
          >
            <ArrowIcon direction='left' />
            <span className='hidden md:block'>Anterior</span>
          </button>
          <button
            className='p-1.5 border-[1px] border-gray-300 flex flex-row-reverse gap-1.5 items-center px-2.5 disabled:opacity-30'
            disabled={response?.last == true}
            onClick={() => {
              handleNextPage();
            }}
          >
            <ArrowIcon direction='right' />
            <span className='hidden md:block'>Siguiente</span>
          </button>
        </div>
      </footer>

      {showDeleteDialog && (
        <ConfirmDeleteEventDialog
          title={deleteEventType || ""}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};
