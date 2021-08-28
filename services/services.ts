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
      //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjp7ImlkX3VzdWFyaW8iOjQwfSwicm9sZSI6InJvbGUiLCJpYXQiOjE2MzAwMjgxMjR9.LFXhZ1siL1Yl_DoGjAY6l6f9BfbDbYQU-ilgxyqABJ8`
    }
  }
);