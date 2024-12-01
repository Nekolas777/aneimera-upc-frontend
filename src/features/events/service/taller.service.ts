import { HttpService } from "../../../shared/services/http.service";
import { Taller } from "../model/taller";

export class TallerService extends HttpService {
  constructor() {
    super();
  }

  async deleteTaller(id: number) {
    try {
      const response = await this.http.delete(`/Taller/delete/${id}`);
      return response?.data;
    } catch (error) {
      console.error(`Error deleting taller with id ${id}`, error);
      throw error;
    }
  }

  async cambiarEstadoTaller(id: number) {
    try {
      const response = await this.http.put(`/Taller/cambiarEstado/${id}`);
      return response?.data;
    } catch (error) {
      console.error(`Error updating estado taller with id ${id}`, error);
      throw error;
    }
  }

  async createTaller(data: Taller, bannerFile: File, expositorFile: File) {
    const formData = new FormData();
    formData.append("Titulo", data.titulo);
    formData.append("Descripcion", data.descripcion);
    formData.append("Fecha", new Date(data.fecha).toISOString());
    formData.append("Hora", data.hora);
    formData.append("Aforo", data.aforo.toString());
    formData.append("Modalidad", data.modalidad);
    formData.append("Enlace", data.enlace);
    formData.append("RutaImagen", data.rutaImagen || '');
    formData.append("ExpositorNombre", data.expositorNombre);
    formData.append("ExpositorRol", data.expositorRol);
    formData.append("ExpositorRutaImagen", data.expositorRutaImagen);
    formData.append("file", bannerFile);

    try {
      const response = await this.http.post('/Taller/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating taller:', error);
      throw error;
    }
  }
}
