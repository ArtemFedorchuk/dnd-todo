import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 6000,
  headers: {
    Accept: 'application/json',
  },
});
