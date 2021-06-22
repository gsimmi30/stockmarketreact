import axios from "axios";
import http from "../http-common";

const API_URL = "https://ancient-shore-52392.herokuapp.com";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/authenticate", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(data) {
    return http.post(`/signup`, data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));;
  }
}

export default new AuthService();