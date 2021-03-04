import axios from "axios";
import authHeader from "./auth-header";

// Just for test purposes
const API_URL = "http://localhost:3000/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  // Just for test purposes
  getAdminBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getStudentBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
