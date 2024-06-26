import axios from 'axios';
import { BASE_URL } from '../constants';

const appAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

appAxios.interceptors.request.use(
  async (config) => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      config.headers['Authorization'] = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

appAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('userToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default appAxios;
