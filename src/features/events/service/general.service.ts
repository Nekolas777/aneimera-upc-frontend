import { HttpService } from "../../../shared/services/http.service";
import { EventType } from "../model/eventos";
import { Ponencia } from "../model/ponencia";
import { RequestEvento } from "../model/requestevento";
import { Taller } from "../model/taller";
import { Visita } from "../model/visita";

export class GeneralService extends HttpService {
  constructor() {
    super();
  }

  async geteventos(requestevento: RequestEvento) {
    try {
      const response = await this.http.post(
        `/General/get_eventos`,
        requestevento
      );
      return response?.data;
    } catch (error) {
      console.error(`Error`, error);
      throw error;
    }
  }

  async updateEvent(type: EventType, data: Ponencia | Visita | Taller) {
    try {
      let endpoint = '';

      switch (type) {
        case EventType.Ponencia:
          endpoint = '/Ponencia/update';
          break;
        case EventType.Visita:
          endpoint = '/Visita/update';
          break;
        case EventType.Taller:
          endpoint = '/Taller/update';
          break;
        default:
          throw new Error('Unknown event type');
      }

      const response = await this.http.put(endpoint, data);
      return response?.data;
    } catch (error) {
      console.error('Error updating event', error);
      throw error;
    }
  }
}