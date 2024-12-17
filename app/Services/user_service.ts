import Env from "@ioc:Adonis/Core/Env";
import TokenContext from "App/Utils/TokenContext";
import axios from "axios";

export default class UserService {
  baseUrl: string;
  headers: object;

  constructor() {
    this.baseUrl = `${Env.get("MS_SECURITY")}/api/users`;
    this.headers = {
      Authorization: `Bearer ${TokenContext.getToken()}`,
    };
  }

  async getUserById(id: string): Promise<any> {
    return axios.get(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  async postUser(user: any): Promise<any> {
    return axios.post(this.baseUrl, user, { headers: this.headers });
  }

  async putUser(user_id: string, user: any): Promise<any> {
    return axios.put(`${this.baseUrl}/${user_id}`, user, {
      headers: this.headers,
    });
  }

  async deleteUser(user_id: string): Promise<any> {
    return axios.delete(`${this.baseUrl}/${user_id}`, {
      headers: this.headers,
    });
  }
}
