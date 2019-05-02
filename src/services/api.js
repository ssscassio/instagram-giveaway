import axios from 'axios';

export const baseURL = 'https://instagram-rest.herokuapp.com/';
const api = axios.create({
  baseURL: baseURL
});

export default api;
