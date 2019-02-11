import Http from '~services/http';
import _ from 'lodash';

const fundingSources = {
  effects: {
    async getTenantFundingSourceList() {
      try {
        const response = await Http.get('/tenants/company/fundingSources/');
        let fundingSources = [];
        this.setTenantFundingSourcePagination({
          limit: 10,
          page: 1,
          pages: 1,
          total: 1,
        });
        if (response.data.name) {
          fundingSources.push(response.data);
        }
        this.setTenantFundingSourceList(fundingSources);
        return [response.data];
      } catch (err) {
        if (err.response.status === 404) {
          this.setTenantFundingSourceList([]);
        }
        throw err;
      }
    },

    async createTenantFundingSource(data) {
      try {
        const response = await Http.post('/tenants/company/fundingSources/', data);
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
        const response = await Http.delete('/tenants/company/fundingSources/');
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

    async getUserFundingSourceList({ userId, page, limit }) {
      try {
        const response = await Http.get(`/users/${userId}/fundingSources`, {
          params: {
            page,
            limit,
          },
        });
        this.setUserFundingSourceList(_.orderBy(response.data.items, ['isDefault'], ['asc']));
        this.setUserFundingSourcePagination(response.data.pagination);
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

    async unmountUserFundingSourceList() {
      this.setUserFundingSourceList([]);
      this.setUserFundingSourcePagination(null);
    },

    async checkUserFundingSource(userId) {
      try {
        const response = await Http.get(`/users/${userId}/fundingSources/default`);
        this.setUserHasFundingSource(true);
        return response.data;
      } catch (err) {
        this.setUserHasFundingSource(false);
        throw err;
      }
    },

    async changeUserFundingSourceStatus(status) {
      this.setUserHasFundingSource(status);
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
        return response.data;
      } catch (err) {
        return err.response;
      }
    },

    async createContractorFundingSource(data) {
      try {
        const response = await Http.post('/contractors/fundingSources/', data.bank);
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
  },
  reducers: {
    setTenantFundingSourceList(state, payload) {
      return { ...state, tenantFundingSourceList: payload };
    },
    setTenantFundingSourcePagination(state, payload) {
      return { ...state, tenantFundingSourcePagination: payload };
    },
    setUserFundingSourceList(state, payload) {
      return { ...state, userFundingSourceList: payload };
    },
    setUserFundingSourcePagination(state, payload) {
      return { ...state, userFundingSourcesPagination: payload };
    },
    setUserHasFundingSource(state, payload) {
      return { ...state, userHasFundingSource: payload };
    },
  },
  state: {
    tenantFundingSourceList: [],
    tenantFundingSourcePagination: null,
    userFundingSourceList: [],
    userFundingSourcePagination: null,
    userHasFundingSource: true,
  },
};

export default fundingSources;
