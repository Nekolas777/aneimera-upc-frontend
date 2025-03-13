import { Ponencia } from "../model/ponencia";
import { HttpService } from "../../../shared/services/http.service";

export class PonenciaService extends HttpService {
  constructor() {
    super();
  }

  // metodo para crear una ponencia agregamos el archivo(bannerImg para ponencia)
  async createPonencia(data: Ponencia, file: File) {

    const formData = new FormData();
    formData.append("PonenciaId", "0");
    formData.append("Titulo", data.titulo);
    formData.append("MisionObjetivo", data.misionObjetivo);
    formData.append("Descripcion", data.descripcion);
    formData.append("Fecha", new Date(data.fecha).toISOString());
    formData.append("Hora", data.hora);
    formData.append("Aforo", data.aforo.toString());
    formData.append("Modalidad", data.modalidad);
    formData.append("Enlace", data.enlace);
    formData.append("estado", 'false'); // Siempre se crea con estado inicial false
    formData.append("RutaImagen", data.rutaImagen!);
    formData.append("file", file);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // enviamos en formato "form-data", ya que permite archivos binarios como imgnes
    try {
      const response = await this.http.post(`/Ponencia/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Error creating a new Ponencia", error);
      throw error;
    }
  }

  // metodo para obtener todas las ponencias
  async getAllPonencias() {
    try {
      const response = await this.http.get("/Ponencia/get_all");
      return response?.data;
    } catch (error) {
      console.error("Error fetching ponencias", error);
      throw error;
    }
  }

  // metodo para obtener una ponencia por su id
  async getPonenciaById(id: number) {
    try {
      const response = await this.http.get(`/Ponencia/get/${id}`);
      return response?.data.ponencia;
    } catch (error) {
      console.error(`Error fetching ponencia with ID ${id}`, error);
      throw error;
    }
  }

  // metodo para actualizar una ponencia
  async updatePonencia(data: Ponencia) {
    console.log(data);
    try {
      const response = await this.http.put("/Ponencia/update", data);
      return response?.data;
    } catch (error) {
      console.error(`Error update ponencia with body: ${data}`, error);
      throw error;
    }
  }

  // metodo pra eliminr una ponencia por Id
  async deletePonencia(id: number) {
    try {
      const response = await this.http.delete(`/Ponencia/delete/${id}`);
      return response?.data;
    } catch (error) {
      console.error(`Error deleteing ponencia with id ${id}`, error);
      throw error;
    }
  }

  async cambiarEstadoPonencia(id: number) {
    try {
      const response = await this.http.patch(`/Ponencia/updateStatus/${id}`);
      return response?.data;
    } catch (error) {
      console.error(`Error update estado ponencia with id ${id}`, error);
      throw error;
    }
  }
}
