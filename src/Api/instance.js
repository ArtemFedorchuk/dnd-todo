import axios from 'axios';

const ROOT_URL = 'https://jsonplaceholder.typicode.com';

export const client = axios.create({
  baseURL: ROOT_URL,
  timeout: 6000,
  headers: {
    Accept: 'application/json',
  },
});
