import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export const setBearerToken = (token: string) => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default API;
