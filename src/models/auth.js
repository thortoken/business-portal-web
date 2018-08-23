import Http, { setAuthHeader, removeAuthHeader } from '~services/http';
import Config from '~services/config';

const auth = {
  effects: {
    async pickToken() {
      const token = localStorage.getItem('thor-token') || null;
      setAuthHeader(token);
      this.setToken(token);
    },

    async saveToken(token) {
      localStorage.setItem('thor-token', token);
      setAuthHeader(token);
      this.setToken(token);
    },

    async removeToken() {
      localStorage.removeItem('thor-token');
      removeAuthHeader();
      this.setToken(null);
    },

    async login(data) {
      try {
        const response = await Http.post('/auth/login', {
          login: data.email,
          password: data.password,
          tenant: Config.tenantId
        });
        const { token, name, phone, email } = response.data;

        this.setUser({ name, phone, email });
        this.saveToken(token);

        return { token, name, phone, email }
      } catch (err) {
        throw err
      }
    },

    async logout() {
      this.removeToken();
    },
  },
  reducers: {
    setToken(state, action) {
      return {
        ...state,
        token: action
      }
    },
    setUser(state, action) {
      return {
        ...state,
        user: action.payload,
      }
    },
  },
  state: {
    user: null,
    token: null,
  },
};

export default auth
