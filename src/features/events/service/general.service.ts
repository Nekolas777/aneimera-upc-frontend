import { HttpService } from "../../../shared/services/http.service";
import { RequestEvento } from "../model/requestevento";

export class GeneralService extends HttpService {
    constructor() {
        super();
    }

    async geteventos(requestevento:RequestEvento) {
        try {
          const response = await this.http.post(`/General/get_eventos`,requestevento);
          return response?.data;
        } catch (error) {
          console.error(`Error`, error);
          throw error;
        }
    }
}