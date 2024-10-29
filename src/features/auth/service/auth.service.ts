import axios, { AxiosInstance } from "axios";
import { environment } from "../../../public/environment";
import { LoginEntity } from "../model/login";

export class AuthService {
  private baseUrl: string = "";
  private http: AxiosInstance;

  constructor() {
    this.baseUrl = environment.baseUrl;
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  async signInUser(credentials: LoginEntity): Promise<string> {
    try {
      const response = await this.http.post("/Usuario/login", credentials);
      const data = response?.data;

      if (data && data.response) {
        return data.response; // retornamos el token
      }

      throw new Error("No se recibió un token en la respuesta");
    } catch (error) {
      console.error("El registro ha fallado", error);
      throw error;
    }
  }
}

// exportamos la instancia de authSerbice
export const authService = new AuthService();
