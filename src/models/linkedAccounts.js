import Http from '~services/http';

const linkedAccounts = {
  effects: {
    async getFundingSource() {
      try {
        const response = await Http.get('/tenants/company/fundingSources/fundingSource');
        let fundingSources = [];
        this.setFundingSourcePagination({
          limit: 10,
          page: 1,
          pages: 1,
          total: 1,
        });
        if (response.data.account) {
          fundingSources.push(response.data);
        }
        this.setFundingSource(fundingSources);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async addFundingSource(data) {
      try {
        const response = await Http.post('/tenants/company/fundingSources/fundingSource', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async deleteFundingSource() {
      try {
        const response = await Http.delete('/tenants/company/fundingSources/fundingSource');
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
