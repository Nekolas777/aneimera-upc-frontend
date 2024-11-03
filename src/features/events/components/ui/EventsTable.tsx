import { ChangeEvent, useState,useEffect } from "react";
import { ArrowIcon } from "../../../../assets/icons/ArrowIcon";
import { TrashIcon } from "../../../../assets/icons/TrashIcon";
import { EditIcon } from "../../../../assets/icons/EditIcon";
import { GeneralService } from "../../service/general.service";
import { RequestEvento } from "../../model/requestevento";
import { Eventos } from "../../model/eventos";

export const EventsTable = () => {

  const generalservice = new GeneralService();

  const [response, setResponse] = useState<Eventos | null>(null);

  const [formData, setFormData] = useState<RequestEvento>({
    Ponencia: true,
    Taller: true,
    VisitaTecnica: true,
    page: 1,
    size: 10,
  });

  const fetchEventos = async () => {
    try {
      const responsee = await generalservice.geteventos(formData);
      setResponse(responsee.eventos)
      console.log("Lista de eventos: ", responsee.eventos.content);
    } catch (error) {
      console.error("Error", error);
    }
  };

  

  useEffect(() => {
    fetchEventos();
  }, [formData]);

  const [typeFilter, setTypeFilter] = useState("");

  const handleNextPage = () => {
    if(response?.last==false){
      setFormData((prevFormData) => ({
        ...prevFormData,
        page: prevFormData.page+1
      }));
    }
  };

  const handlePreviousPage = () => {
    if(formData.page!=1){
      setFormData((prevFormData) => ({
        ...prevFormData,
        page: prevFormData.page-1,
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

  const handleEdit = (ponenciaId?:number,tallerId?:number,visitaTecninaId?:number) => {
    //dependiendo si no es null va por cada camino
    if(ponenciaId!=null){

    }
    if(tallerId!=null){

    }
    if(visitaTecninaId!=null){

    }
  };

  const handleDelete = (ponenciaId?:number,tallerId?:number,visitaTecninaId?:number) => {
    //dependiendo si no es null va por cada camino
    if(ponenciaId!=null){

    }
    if(tallerId!=null){

    }
    if(visitaTecninaId!=null){

    }
  };

  const handleLink = (link:string) => {
    window.location.href = link;
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
    
    const value = e.target.value;

    setFormData((prevFormData) => {
      switch (value) {
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

      <div className='mb-5'>
        <label htmlFor='typeFilter' className='mr-2'>
          Filter by Type:
        </label>
        <select
          id='typeFilter'
          value={typeFilter}
          onChange={handleFilterChange}
          className='border px-2 py-1'
        >
          <option value=''>Mostrar Todos</option>
          <option value='Visita'>Visita</option>
          <option value='Ponencia'>Ponencia</option>
          <option value='Taller'>Taller</option>
        </select>
      </div>
      <div className='contain-inline-size min-w-full overflow-x-auto'>
        <table className='border-[1px] border-gray-300 w-full min-w-full text-left'>
          <thead className='bg-slate-800 text-white'>
          <tr className="text-center">
            <th className="capitalize px-3.5 py-2.5">N°</th>
            <th className="capitalize px-3.5 py-2.5">Titulo</th>
            <th className="capitalize px-3.5 py-2.5">Aforo</th>
            <th className="capitalize px-3.5 py-2.5">Modalidad</th>
            <th className="capitalize px-3.5 py-2.5">Tipo</th>
            <th className="capitalize px-3.5 py-2.5">Fecha</th>
            <th className="capitalize px-3.5 py-2.5">Hora</th>
            <th className="capitalize px-3.5 py-2.5">Acciones</th>
          </tr>
          </thead>
          <tbody>
            {response?.content.map((evento,i) => (
              <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-slate-200/80" : "bg-slate-50"
              } hover:text-red-800 cursor-pointer text-center`}
              onClick={()=>handleLink(evento.enlace)}
              >
                <td>{i+1+((formData.page-1)*formData.size)}</td>
                <td>{evento.titulo}</td>
                <td>{evento.aforo}</td>
                <td>{evento.modalidad}</td>
                <td>{evento.tipo}</td>
                <td>{evento.fecha.toString().substring(0, 10)}</td>
                <td>{evento.hora}</td>
                <div className='flex flex-row gap-1.5 justify-center'>
                  <button
                    className='bg-blue-600 p-2 rounded-lg hover:bg-blue-800 transition-all duration-200 ease-linear'
                    onClick={() => handleEdit(evento.ponenciaId,evento.tallerId,evento.visitaTecninaId)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className='bg-red-600 p-2 rounded-lg hover:bg-red-800 transition-all duration-200 ease-linear'
                    onClick={() => handleDelete(evento.ponenciaId,evento.tallerId,evento.visitaTecninaId)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
            {response && response.content ? (
              `${Math.min(formData.size, response.content.length)} de ${response.totalElements} eventos`
            ) : (
              "Cargando eventos..."
            )}
          </span>
        </div>
        <div className='flex flex-row items-center gap-2.5'>
          <button
            className='py-1.5 border-[1px] border-gray-300 flex flex-row items-center gap-1.5 px-2.5 disabled:opacity-50'
            disabled={formData.page==1}
            onClick={() => {
              handlePreviousPage();
            }}
          >
            <ArrowIcon direction='left' />
            <span className='hidden md:block'>Anterior</span>
          </button>
          <button
            className='p-1.5 border-[1px] border-gray-300 flex flex-row-reverse gap-1.5 items-center px-2.5 disabled:opacity-30'
            disabled={response?.last==true}
            onClick={() => {
              handleNextPage();
            }}
          >
            <ArrowIcon direction='right' />
            <span className='hidden md:block'>Siguiente</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
