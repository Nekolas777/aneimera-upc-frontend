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
        console.error(`Error deleteing visita tecnica with id ${id}`, error);
        throw error;
      }
    }

    async cambiarEstadoVisita(id: number) {
      try {
        const response = await this.http.put(`/VisitaTecnica/cambiarEstado/${id}`);
        return response?.data;
      } catch (error) {
        console.error(`Error update estado visita tecnica with id ${id}`, error);
        throw error;
      }
    }
}