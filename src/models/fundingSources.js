import Http from '~services/http';
import _ from 'lodash';

const fundingSources = {
  effects: {
    async getTenantFundingSources() {
      try {
        const response = await Http.get('/tenants/company/fundingSources');
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
        this.setFundingSourceList(fundingSources);
        return [response.data];
      } catch (err) {
        throw err;
      }
    },

    async createTenantFundingSource(data) {
      try {
        const response = await Http.post('/tenants/company/fundingSources', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async createTenantFundingSourceWithIAV(uri) {
      try {
        const response = await Http.post('/tenants/company/fundingSources/iav', uri);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async deleteTenantFundingSource() {
      try {
        const response = await Http.delete('/tenants/company/fundingSources');
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async verifyTenantFundingSource() {
      try {
        const response = await Http.post('/tenants/company/fundingSources/verify');
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async verifyTenantFundingSourceAmount(data) {
      try {
        const response = await Http.patch('/tenants/company/fundingSources/verify', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async getUserFundingSources({ userId, page, limit }) {
      try {
        const response = await Http.get(`/users/${userId}/fundingSources`, {
          params: {
            page,
            limit,
          },
        });
        this.setFundingSourceList(_.orderBy(response.data.items, ['isDefault'], ['asc']));
        this.setFundingSourcePagination(response.data.pagination);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async createUserFundingSource({ userId, data }) {
      try {
        const response = await Http.post(`/users/${userId}/fundingSources`, data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async setUserDefaultFundingSource({ userId, fundingId }) {
      try {
        const response = await Http.post(`/users/${userId}/fundingSources/${fundingId}/default`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async deleteUserFundingSource({ userId, fundingId }) {
      try {
        const response = await Http.delete(`/users/${userId}/fundingSources/${fundingId}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async unmountFundingSources() {
      this.setFundingSourceList([]);
      this.setFundingSourcePagination(null);
    },

    async checkUserFundingSource(userId) {
      try {
        const response = await Http.get(`/users/${userId}/fundingSources/default`);
        this.setHasFundingSource(true);
        return response.data;
      } catch (err) {
        this.setHasFundingSource(false);
        throw err;
      }
    },

    async changeUserFundingSourceStatus(status) {
      this.setHasFundingSource(status);
    },

    async verifyFundingSource(id) {
      try {
        const response = await Http.post(`/fundingSources/${id}/verify`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async verifyFundingSourceAmount({ data, id }) {
      try {
        const response = await Http.patch(`/fundingSources/${id}/verify`, data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async checkContractorFundingSource() {
      try {
        const response = await Http.get('/contractors/fundingSources/default');
        this.setHasFundingSource(true);
        return response.data;
      } catch (err) {
        this.setHasFundingSource(false);
        return err.response;
      }
    },

    async createContractorFundingSource(data) {
      try {
        const response = await Http.post('/contractors/fundingSources/', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async createContractorFundingSourceWithIAV(data) {
      try {
        const response = await Http.post('/contractors/fundingSources/iav', data.bank);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async getIavToken({ type }) {
      let response = null;
      try {
        switch (type) {
          case 'contractors':
            response = await Http.get(`/contractors/fundingSources/iav`);
            break;
          case 'tenants':
          default:
            response = await Http.get(`/tenants/company/fundingSources/iav`);
            break;
        }

        this.setIavToken(response.data.token);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setFundingSourceList(state, payload) {
      return { ...state, fundingSourceList: payload };
    },
    setFundingSourcePagination(state, payload) {
      return { ...state, fundingSourcePagination: payload };
    },
    setHasFundingSource(state, payload) {
      return { ...state, hasFundingSource: payload };
    },
    setIavToken(state, payload) {
      return { ...state, iavToken: payload };
    },
  },
  state: {
    fundingSourceList: [],
    fundingSourcePagination: null,
    hasFundingSource: false,
    iavToken: '',
  },
};

export default fundingSources;
