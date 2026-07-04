import axios from 'axios';

const api = axios.create({
  baseURL: '/api' // Usando proxy do Vite
});

export default api;
