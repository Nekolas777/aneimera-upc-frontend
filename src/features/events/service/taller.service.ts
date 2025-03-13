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
  
  async getTallerById(id: number) {
    try {
      const response = await this.http.get(`/Taller/get/${id}`);
      return response?.data.taller;
    } catch (error) {
      console.error('Error fetching Taller', error);
      throw error;
    }
  }

  // metodo para actualizar un Taller
  async updateTaller(data: Taller) {
    try {
      const response = await this.http.put("/Taller/update", data);
      return response?.data;
    } catch (error) {
      console.error(`Error update ponencia with body: ${data}`, error);
      throw error;
    }
  }

  async cambiarEstadoTaller(id: number) {
    try {
      const response = await this.http.patch(`/Taller/updateStatus/${id}`);
      return response?.data;
    } catch (error) {
      console.error(`Error updating estado taller with id ${id}`, error);
      throw error;
    }
  }

  async createTaller(data: Taller, bannerFile: File, expositorFile: File) {
    const formData = new FormData();
    formData.append("TallerId", "0");
    formData.append("Titulo", data.titulo.trim());
    formData.append("Descripcion", data.descripcion.trim());
    formData.append("Fecha", new Date(data.fecha).toISOString());
    formData.append("Hora", data.hora);
    formData.append("Aforo", data.aforo.toString());
    formData.append("Modalidad", data.modalidad);
    formData.append("Enlace", data.enlace.trim());
    formData.append("estado", 'false');
    formData.append("RutaImagen", data.rutaImagen || '');
    formData.append("ExpositorNombre", data.expositorNombre.trim());
    formData.append("ExpositorRol", data.expositorRol.trim());
    formData.append("ExpositorRutaImagen", data.expositorRutaImagen);
    formData.append("file", bannerFile);
    formData.append("fileExpositor", expositorFile);

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
