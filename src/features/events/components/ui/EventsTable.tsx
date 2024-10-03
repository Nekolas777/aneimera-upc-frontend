import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChangeEvent, useMemo, useState } from "react";
import { Event, events } from "../../mocks/events-mock-data";
import { ArrowIcon } from "../../../../assets/icons/ArrowIcon";
import { TrashIcon } from "../../../../assets/icons/TrashIcon";
import { EditIcon } from "../../../../assets/icons/EditIcon";

export const EventsTable = () => {
  const [data, setData] = useState(() => [...events].slice(0, 99));

  const [typeFilter, setTypeFilter] = useState("");

  const columnHelper = createColumnHelper<Event>();

  const columns = [
    columnHelper.group({
      id: "Event ID",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "N°",
    }),
    columnHelper.accessor("titulo", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Titulo",
    }),
    columnHelper.accessor("descripcion", {
      cell: (info) => (
        <span className='descripcion-cell'>{info.getValue()}</span>
      ),
      header: "Descripcion",
    }),
    columnHelper.accessor("aforo", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Aforo",
    }),
    columnHelper.accessor("modalidad", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Modalidad",
    }),
    columnHelper.accessor("tipo", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Tipo",
    }),
    columnHelper.accessor("fecha", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Fecha",
    }),
    columnHelper.accessor("hora", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Hora",
    }),
    columnHelper.display({
      id: "acciones",
      header: "Acciones",
      cell: () => (
        <div className='flex flex-row gap-1.5'>
          <button
            className='bg-blue-600 p-2 rounded-lg hover:bg-blue-800 transition-all duration-200 ease-linear'
            onClick={() => handleEdit()}
          >
            <EditIcon />
          </button>
          <button
            className='bg-red-600 p-2 rounded-lg hover:bg-red-800 transition-all duration-200 ease-linear'
            onClick={() => handleDelete()}
          >
            <TrashIcon />
          </button>
        </div>
      ),
    }),
  ];

  // filtramos los datos basados en el filtro seleccionado.
  // usamos el hook useMemo para memorizar los datos filtrados y evitar renderizados innecesarios.
  // esta función solo se ejecuta cuando hay cambios en typeFilter o data
  const filteredData = useMemo(() => {
    return typeFilter
      ? data.filter((row) => row.tipo.includes(typeFilter))
      : data;
  }, [typeFilter, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  const [eventCount, setEventCount] = useState(
    table.getState().pagination.pageSize
  );

  const handleNextPage = () => {
    table.nextPage();
    setEventCount(
      (prevCount) => prevCount + table.getState().pagination.pageSize
    );
  };

  const handlePreviousPage = () => {
    table.previousPage();
    setEventCount(
      (prevCount) => prevCount - table.getState().pagination.pageSize
    );
  };

  const handleSelectedOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    table.setPageSize(newSize);
    setEventCount(newSize);
    table.setPageIndex(0);
  };

  const handleEdit = () => {
    console.log("Editar");
  };

  const handleDelete = () => {
    console.log("Eliminar");
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
    table.setPageIndex(0);
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
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`capitalize px-3.5 py-2.5 ${
                      header.column.id === "Event ID" ? "text-center" : ""
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`${
                  i % 2 === 0 ? "bg-slate-200/80" : "bg-slate-50"
                } hover:text-red-800 cursor-pointer`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-3.5 h-16 ${
                      cell.column.id === "Event ID" ? "text-center" : ""
                    } ${
                      cell.column.id === "descripcion" ? "max-w-[250px]" : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
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
              value={table.getState().pagination.pageSize}
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
            {Math.min(eventCount, data.length)} de {data.length} eventos
          </span>
        </div>
        <div className='flex flex-row items-center gap-2.5'>
          <button
            className='py-1.5 border-[1px] border-gray-300 flex flex-row items-center gap-1.5 px-2.5 disabled:opacity-50'
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              handlePreviousPage();
            }}
          >
            <ArrowIcon direction='left' />
            <span className='hidden md:block'>Anterior</span>
          </button>
          <button
            className='p-1.5 border-[1px] border-gray-300 flex flex-row-reverse gap-1.5 items-center px-2.5 disabled:opacity-30'
            disabled={!table.getCanNextPage()}
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
