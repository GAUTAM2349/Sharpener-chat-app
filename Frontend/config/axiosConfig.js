import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:4007/", 
});


const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers["token"] = `Bearer ${token}`;
} else {
  api.defaults.headers.token = null;
}

export default api;
