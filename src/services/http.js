import axios from 'axios';

import store from '~models';
import Config from './config';

import NotificationService from '~services/notification';

const Http = axios.create({
  baseURL: Config.apiUrl,
});

Http.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch.auth.logout();
    } else if (error.response.status === 403) {
      NotificationService.open({
        type: 'warning',
        message: 'Warning',
        description: 'Forbidden.',
      });
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
