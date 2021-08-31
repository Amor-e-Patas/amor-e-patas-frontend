import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: "http://localhost:3333/",
});

export default api;

export const authenticatedAPI = axios.create(
  {
    baseURL: "http://localhost:3333/",
    headers: {
      Authorization: `Bearer ${Cookies.get("user-token")}`
    }
  }
);