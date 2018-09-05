import Http from '~services/http';

const tenants = {
  effects: {
    async getStats() {
      try {
        const response = await Http.get('/tenants/statistics');
        console.log('response.data', response.data);
        this.setStats(response.data);
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
