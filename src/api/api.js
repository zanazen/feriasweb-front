import axios from "axios";

const apiURLs = {
  development: "http://localhost:8080",
  production: "https://feriasweb.cyclic.app",
}

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });
api.interceptors.request.use((config) => {
  const loggedInUserJson = localStorage.getItem('loggedUser');
  const parsedLoggedInUser = JSON.parse(loggedInUserJson || '""');
  if (parsedLoggedInUser.token) {
    config.headers = { Authorization: `Bearer ${parsedLoggedInUser.token}` };
  }
  return config;
});

export { api };