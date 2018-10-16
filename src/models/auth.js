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

    async pickRoles() {
      let roles = JSON.parse(localStorage.getItem('thor-roles')) || [];
      this.setRoles(roles);
    },

    async saveRole(roles) {
      let mappedRoles = roles.map(value => {
        return value.name;
      });
      localStorage.setItem('thor-roles', JSON.stringify(mappedRoles));
      this.setRoles(mappedRoles);
    },

    async removeToken() {
      localStorage.removeItem('thor-token');
      removeAuthHeader();
      this.setToken(null);
    },

    async removeRoles() {
      localStorage.removeItem('thor-roles');
      this.setRoles([]);
    },

    async login(data) {
      try {
        const response = await Http.post('/auth/login', {
          login: data.email,
          password: data.password,
          tenant: data.tenant || Config.tenantId,
        });

        const { token, name, phone, email } = response.data;
        const { roles } = response.data.tenantProfile;
        this.setUser({ name, phone, email });
        this.saveRole(roles);
        this.saveToken(token);

        return { token, name, phone, email };
      } catch (err) {
        throw err;
      }
    },

    async logout() {
      this.removeToken();
      this.removeRoles();
    },
  },
  reducers: {
    setToken(state, action) {
      return {
        ...state,
        token: action,
      };
    },
    setRoles(state, action) {
      return {
        ...state,
        roles: action,
      };
    },
    setUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
  state: {
    user: null,
    token: null,
    roles: [],
  },
};

export default auth;
