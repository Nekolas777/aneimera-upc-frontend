import { Visita } from "./../model/visita";
import { HttpService } from "../../../shared/services/http.service";

export class VisitaService extends HttpService {
  constructor() {
    super();
  }

  async deleteVisita(id: number) {
    try {
      const response = await this.http.delete(`/VisitaTecnica/delete/${id}`);
      return response?.data;
    } catch (error) {
      console.error(`Error deleting visita técnica with ID ${id}`, error);
      throw error;
    }
  }

  async cambiarEstadoVisita(id: number) {
    try {
      const response = await this.http.patch(
        `/VisitaTecnica/updateStatus/${id}`
      );
      return response?.data;
    } catch (error) {
      console.error(
        `Error updating estado visita técnica with ID ${id}`,
        error
      );
      throw error;
    }
  }

  async createVisita(data: Visita, file: File) {
    const formData = new FormData();
    formData.append("visitaTecninaId", "0");
    formData.append("titulo", data.titulo.trim());
    formData.append("descripcion", data.descripcion.trim());
    formData.append("fecha", new Date(data.fecha).toISOString());
    formData.append("hora", data.hora);
    formData.append("aforo", data.aforo.toString());
    formData.append("modalidad", data.modalidad);
    formData.append("enlace", data.enlace.trim());
    formData.append("estado", 'false'); // Siempre se crea con estado false
    formData.append("rutaImagen", data.rutaImagen || "");
    formData.append("file", file);

    try {
      const response = await this.http.post(`/VisitaTecnica/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error creating a new visita técnica", error);
      throw error;
    }
  }

  async getAllVisitas() {
    try {
      const response = await this.http.get("/VisitaTecnica/get_all");
      return response?.data;
    } catch (error) {
      console.error("Error fetching visitas técnicas", error);
      throw error;
    }
  }

  async getVisitaById(id: number) {
    try {
      const response = await this.http.get(`/VisitaTecnica/get/${id}`);
      return response?.data.visitaTecnica;
    } catch (error) {
      console.error(
        `Error fetching visita técnica with ID ${id.toString()}`,
        error
      );
      throw error;
    }
  }

  async updateVisita(data: Visita) {
    try {
      const response = await this.http.put("/VisitaTecnica/update", data);
      return response?.data;
    } catch (error) {
      console.error(`Error updating visita técnica with data:`, data, error);
      throw error;
    }
  }
}
