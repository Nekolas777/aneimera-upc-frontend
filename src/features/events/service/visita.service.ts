import { Visita } from './../model/visita';
import { HttpService } from "../../../shared/services/http.service";

export class VisitaService extends HttpService{
    constructor() {
        super();
    }

    //mètodo para crear una visita 
    async createVisita(data: Visita, file: File) {

        const formData = new FormData();
        formData.append("visitaTecninaId", "0");
        formData.append("titulo", data.titulo);
        formData.append("descripcion", data.descripcion);
        formData.append("fecha", new Date(data.fecha).toISOString());
        formData.append("hora", data.hora);
        formData.append("aforo", data.aforo.toString());
        formData.append("modalidad", data.modalidad);
        formData.append("enlace", data.enlace);
        formData.append("rutaImagen", data.rutaImagen!);
        formData.append("file", file);

        //enviar en formato "form-data", permite archivos binarios como imàgenes
        try {
            const response = await this.http.post(`/VisitaTecnica/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response?.data;
        }
        catch (error) {
            console.error("Error creating a new Visita", error);
            throw error;
        }
    }

    // metodo para obtener todas las visitas tècnicas
    async getAllVisitas() {
        try {
            const response = await this.http.get("/VisitaTecnica/get_all");
            return response?.data;
        } catch (error) {
            console.error("Error fetching visitas", error);
            throw error;
        }
    }

    // metodo para obtener una visita tènica por su id
    async getVisitaById(id: string) {
        try {
            const response = await this.http.get(`/VisitaTecnica/get/${id}`);
            return response?.data;
        } catch (error) {
            console.error(`Error fetching visita tènica with ID ${id}`, error);
            throw error;
        }
    }


    // metodo para actualizar una visita tènica
    async updateVisita(data: Visita) {
        try {
            const response = await this.http.put("/VisitaTecnica/update", data);
            return response?.data;
        } catch (error) {
            console.error(`Error update visita tènica with body: ${data}`, error);
            throw error;
        }
    }

    // metodo pra eliminr una visita tènica por Id
    async deleteVisita(id: string) {
        try {
            const response = await this.http.delete(`/VisitaTecnica/delete/${id}`);
            return response?.data;
        } catch (error) {
            console.error(`Error deleteing visita tènica with id ${id}`, error);
            throw error;
        }
    }
}