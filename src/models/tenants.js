import Http from '~services/http';

const tenants = {
  effects: {
    async getTenant() {
      try {
        const response = await Http.get('/tenants');
        const { name, status, settings } = response.data;
        this.saveTenant({ name, status, settings });

        return { name, status, settings };
      } catch (err) {
        throw err;
      }
    },

    pickTenant() {
      const tenant = JSON.parse(localStorage.getItem('thor-tenant')) || null;
      this.setTenant({ ...tenant });
    },

    saveTenant(tenant) {
      localStorage.setItem('thor-tenant', JSON.stringify(tenant));
      this.setTenant({ ...tenant });
    },

    removeTenant() {
      localStorage.removeItem('thor-tenant');
      this.setTenant({});
    },

    updateStatus(status, models) {
      const tenant = {
        ...models.tenants.tenant,
        status,
      };
      this.saveTenant(tenant);
    },

    async getStats() {
      try {
        const response = await Http.get('/tenants/statistics');
        this.setStats(response.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async changeAdminPassword(data) {
      try {
        const response = await Http.patch('/auth/password', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async createIAVFundingSource(uri) {
      try {
        const response = await Http.post('/tenants/company/fundingSources/iav', uri);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setStats(state, payload) {
      return { ...state, stats: payload };
    },
    setTenant(state, payload) {
      return {
        ...state,
        tenant: { ...payload },
      };
    },
  },
  state: {
    stats: { total: 0 },
    tenant: {},
  },
};

export default tenants;
