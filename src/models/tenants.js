import Http from '~services/http';

const tenants = {
  effects: {
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
  },
  state: {
    stats: { total: 0 },
  },
};

export default tenants;
