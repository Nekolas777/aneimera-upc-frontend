export interface Visita {
  visitaTecninaId?: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  aforo: number;
  modalidad: string;
  enlace: string;
  estado: boolean;
  rutaImagen?: string;
}
