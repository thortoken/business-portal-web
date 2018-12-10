import Http, { setAuthHeader, removeAuthHeader } from '~services/http';
import Config from '~services/config';

const auth = {
  effects: {
    async init() {
      const token = localStorage.getItem('thor-token') || null;
      const user = JSON.parse(localStorage.getItem('thor-user')) || null;
      debugger;
      let roles = JSON.parse(localStorage.getItem('thor-roles')) || [];
      setAuthHeader(token);
      this.setInit({ user, token, roles, loggedOut: false });
    },
    async pickToken() {
      const token = localStorage.getItem('thor-token') || null;
      setAuthHeader(token);
      this.setToken({ token, loggedOut: false });
    },

    async pickUser() {
      const user = localStorage.getItem('thor-user') || null;
      this.setUser({ ...user });
    },

    async saveToken(token) {
      localStorage.setItem('thor-token', token);
      setAuthHeader(token);
      this.setToken({ token, loggedOut: false });
      //hella
    },

    async saveUser(user) {
      localStorage.setItem('thor-user', JSON.stringify(user));
      this.setUser({ ...user });
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

    async removeUser() {
      localStorage.removeItem('thor-user');
      this.setRoles({ roles: [], loggedOut: true });
    },

    async login(data) {
      try {
        const response = await Http.post('/auth/login', {
          login: data.email,
          password: data.password,
          tenant: data.tenant || Config.tenantId,
        });

        const { token } = response.data;
        const { roles, phone, email, firstName, lastName, id } = response.data.tenantProfile;
        await this.saveUser({ firstName, lastName, phone, email, id });
        await this.saveRole(roles, true);
        await this.saveToken(token, true);

        return { token, phone, email };
      } catch (err) {
        throw err;
      }
    },
    async resetPassword(data) {
      try {
        const response = await Http.post('/auth/resetPassword', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async checkResetToken(data) {
      try {
        const response = await Http.get(`/auth/resetPassword/${data.resetToken}`);
        return response.status === 204;
      } catch (err) {
        return false;
      }
    },

    async logout() {
      this.removeToken();
      this.removeRoles();
      this.removeUser();
      Config.savedRoot = '/payments';
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
    setInit(state, payload) {
      return {
        ...state,
        roles: payload.roles,
        token: payload.token,
        user: payload.user,
        loggedOut: payload.loggedOut,
      };
    },
    setUser(state, payload) {
      return {
        ...state,
        user: { ...payload },
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
