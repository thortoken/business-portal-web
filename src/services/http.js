import axios from 'axios';

import store from '~models';
import Config from './config';

const Http = axios.create({
  baseURL: Config.apiUrl,
});

Http.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch.auth.logout();
    }
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
