import Http from '~services/http';

const linkedAccounts = {
  effects: {
    async getFundingSource() {
      try {
        const response = await Http.get('/tenants/company/fundingSources/');
        let fundingSources = [];
        this.setFundingSourcePagination({
          limit: 10,
          page: 1,
          pages: 1,
          total: 1,
        });
        if (response.data.name) {
          fundingSources.push(response.data);
        }
        this.setFundingSource(fundingSources);
        return [response.data];
      } catch (err) {
        if (err.response.status === 404) {
          this.setFundingSource([]);
        }
        throw err;
      }
    },

    async addFundingSource(data) {
      try {
        const response = await Http.post('/tenants/company/fundingSources/', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async deleteFundingSource() {
      try {
        const response = await Http.delete('/tenants/company/fundingSources/');
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async verifyFundingSource() {
      try {
        const response = await Http.post('/tenants/company/fundingSources/verify');
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async verifyFundingSourceAmount(data) {
      try {
        const response = await Http.patch('/tenants/company/fundingSources/verify', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setFundingSource(state, payload) {
      return { ...state, fundingSources: payload };
    },
    setFundingSourcePagination(state, payload) {
      return { ...state, fundingSourcesPagination: payload };
    },
  },
  state: {
    fundingSources: [],
    fundingSourcesPagination: null,
  },
};

export default linkedAccounts;
