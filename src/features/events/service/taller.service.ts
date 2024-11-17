import { HttpService } from "../../../shared/services/http.service";
export class TallerService extends HttpService {
    constructor() {
        super();
    }

    async deleteTaller(id: number) {
      try {
        const response = await this.http.delete(`/Taller/delete/${id}`);
        return response?.data;
      } catch (error) {
        console.error(`Error deleteing taller with id ${id}`, error);
        throw error;
      }
    }

    async cambiarEstadoTaller(id: number) {
      try {
        const response = await this.http.put(`/Taller/cambiarEstado/${id}`);
        return response?.data;
      } catch (error) {
        console.error(`Error update estado taller with id ${id}`, error);
        throw error;
      }
    }
}