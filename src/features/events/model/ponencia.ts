export interface Ponencia {
  ponenciaId?: number;
  titulo: string;
  mision: string;
  descripcion: string;
  fecha: string;
  hora: string;
  aforo: number;
  modalidad: string;
  enlace: string;
  rutaImagen?: string;
}