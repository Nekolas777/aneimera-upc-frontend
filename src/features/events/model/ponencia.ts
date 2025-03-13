export interface Ponencia {
  ponenciaId?: number;
  titulo: string;
  misionObjetivo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  aforo: number;
  modalidad: string;
  enlace: string;
  estado: boolean;
  rutaImagen?: string;
}