import axios from "axios";

const apiURL = {
  development: "http://localhost:8080",
  production: "https://feriasweb.cyclic.app",
}

const api = axios.create({ baseURL: apiURL});

api.interceptors.request.use((config) => {
  const loggedUserJSON = localStorage.getItem("loggedUser");
  const loggedUserObj = JSON.parse(loggedUserJSON || '""');

  if (loggedUserObj.token) {
    config.headers = { Authorization: `Bearer ${loggedUserObj.token}` };
  }

  return config;
});

export { api };