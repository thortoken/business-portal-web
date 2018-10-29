import Http, { setAuthHeader, removeAuthHeader } from '~services/http';
import Config from '~services/config';

const auth = {
  effects: {
    async pickToken() {
      const token = localStorage.getItem('thor-token') || null;
      setAuthHeader(token);
      this.setToken({ token, loggedOut: false });
    },

    async saveToken(token) {
      localStorage.setItem('thor-token', token);
      setAuthHeader(token);
      this.setToken({ token, loggedOut: false });
    },

    async pickRoles() {
      let roles = JSON.parse(localStorage.getItem('thor-roles')) || [];
      this.setRoles({ roles, loggedOut: false });
    },

    async saveRole(roles) {
      let mappedRoles = roles.map(value => {
        return value.name;
      });
      localStorage.setItem('thor-roles', JSON.stringify(mappedRoles));
      this.setRoles({ roles: mappedRoles, loggedOut: false });
    },

    async removeToken() {
      localStorage.removeItem('thor-token');
      removeAuthHeader();
      this.setToken({ token: null, loggedOut: true });
    },

    async removeRoles() {
      localStorage.removeItem('thor-roles');
      this.setRoles({ roles: [], loggedOut: true });
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
        await this.saveRole(roles, true);
        await this.saveToken(token, true);

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
    setToken(state, payload) {
      return {
        ...state,
        token: payload.token,
        loggedOut: payload.loggedOut,
      };
    },
    setRoles(state, payload) {
      return {
        ...state,
        roles: payload.roles,
        loggedOut: payload.loggedOut,
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
    loggedOut: false,
  },
};

export default auth;
