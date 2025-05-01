// import axios from "axios";


// const api = axios.create({
//   baseURL: "http://localhost:4007/", 
// });


// const token = localStorage.getItem("token");
// if (token) {
//   api.defaults.headers["token"] = `Bearer ${token}`;
// } else {
//   api.defaults.headers.token = null;
// }

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4007",
});

// Interceptor to set token on each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["token"] = token ? `Bearer ${token}` : null;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
