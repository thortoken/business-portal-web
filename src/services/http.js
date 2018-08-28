import axios from 'axios';

import Config from './config';

const Http = axios.create({
  baseURL: Config.apiUrl,
});

Http.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export const setAuthHeader = token => {
  Http.defaults.headers.Authorization = 'Bearer ' + token;
};
export const removeAuthHeader = () => {
  delete Http.defaults.headers.Authorization;
};

export default Http;
