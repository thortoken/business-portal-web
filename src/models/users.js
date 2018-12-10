import Http from '~services/http';
import _ from 'lodash';

const users = {
  effects: {
    async create(data) {
      try {
        const response = await Http.post('/users', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async createFundingSource({ id, data }) {
      try {
        const response = await Http.post(`/users/${id}/fundingSources`, data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async setDefaultFundingSource({ userId, fundingId }) {
      try {
        const response = await Http.post(`/users/${userId}/fundingSources/${fundingId}/default`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async deleteFundingSource({ userId, fundingId }) {
      try {
        const response = await Http.delete(`/users/${userId}/fundingSources/${fundingId}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async updateTenantProfile({ id, tenantProfile }) {
      try {
        const response = await Http.patch(`/users/${id}/profile`, { profile: tenantProfile });
        this.setTenantProfile(tenantProfile);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async retryContractor({ id, data }) {
      try {
        const response = await Http.put(`/users/${id}`, data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async checkFundingSource(id) {
      try {
        const response = await Http.get(`/users/${id}/fundingSources/default`);
        this.setHasFundingSource(true);
        return response.data;
      } catch (err) {
        this.setHasFundingSource(false);
        throw err;
      }
    },
    async changeFundingSourceStatus(status) {
      this.setHasFundingSource(status);
    },
    async getUser(id) {
      try {
        const response = await Http.get(`/users/${id}`);
        this.setCurrent(response.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async deleteUser(id) {
      try {
        const response = await Http.delete(`/users/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async sendPasswordReset(id) {
      try {
        const response = await Http.post(`/users/${id}/passwordReset`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async getUsers({ startDate, endDate, status, page, limit, orderBy, order, contractor }) {
      try {
        const response = await Http.get(`/users`, {
          params: {
            page,
            limit,
            startDate: new Date(startDate.utc()),
            endDate: new Date(endDate.utc()),
            orderBy,
            order,
            contractor,
          },
        });
        this.setUsers(response.data.items);
        this.setUsersPagination(response.data.pagination);
        return response.data.items;
      } catch (err) {
        throw err;
      }
    },
    async getCurrentUserStatistics({
      id,
      currentStartDate,
      currentEndDate,
      previousStartDate,
      previousEndDate,
    }) {
      try {
        const response = await Http.get(`/users/${id}/statistics`, {
          params: {
            currentStartDate: new Date(currentStartDate.utc()),
            currentEndDate: new Date(currentEndDate.utc()),
            previousStartDate: new Date(previousStartDate.utc()),
            previousEndDate: new Date(previousEndDate.utc()),
          },
        });

        this.setCurrentUserStatistics(response.data);
      } catch (err) {
        throw err;
      }
    },
    async getUsersJobs({ startDate, endDate, status, page, limit, orderBy, order, contractor }) {
      try {
        const response = await Http.get(`/users/rating/jobs`, {
          params: {
            limit,
            page,
            startDate: new Date(startDate.utc()),
            endDate: new Date(endDate.utc()),
            status,
            orderBy,
            order,
            contractor,
          },
        });
        const res = response.data.items.map(userJob => {
          return { ...userJob, contractor: `${userJob.firstName} ${userJob.lastName}` };
        });
        this.setUsersJobs(res);
        this.setPaymentsPagination(response.data.pagination);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async getUsersWithTransactions({ startDate, endDate, status, page, limit }) {
      try {
        const response = await Http.get(`/users/payments/list`, {
          params: {
            limit,
            page,
            embed: 'transactions',
            startDate: new Date(startDate.utc()),
            endDate: new Date(endDate.utc()),
            status,
          },
        });
        if (status === 'done') {
          this.setUsersPaidTransactions(response.data);
        } else if (status === 'new') {
          this.setUsersPendingTransactions(response.data);
        } else {
          this.setUsersTransactions(response.data);
        }
        this.setPaymentsPagination(response.data.pagination);

        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async getUserFundingSources({ id, page, limit }) {
      try {
        const response = await Http.get(`/users/${id}/fundingSources`, {
          params: {
            page,
            limit,
          },
        });
        this.setUserFundingSources(_.orderBy(response.data.items, ['isDefault'], ['asc']));
        this.setFundingSourcesPagination(response.data.pagination);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async unmountUserFundingSources() {
      this.setUserFundingSources([]);
      this.setFundingSourcesPagination(null);
    },
    async getUserDocuments({ id, page, limit }) {
      try {
        const response = await Http.get(`/users/${id}/documents`, {
          params: {
            page,
            limit,
          },
        });
        this.setUserDocuments(response.data);
        this.setUserDocumentsPagination({
          limit: 10,
          page: 1,
          pages: 1,
          total: 1,
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async unmountUserDocuments() {
      this.setUserDocuments([]);
      this.setUserDocumentsPagination(null);
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
  },
  reducers: {
    setUsersPaidTransactions(state, payload) {
      return { ...state, usersPaidTransactions: payload };
    },
    setUsersPendingTransactions(state, payload) {
      return { ...state, usersPendingTransactions: payload };
    },
    setUsersTransactions(state, payload) {
      return { ...state, transactions: payload };
    },
    setCurrent(state, payload) {
      return { ...state, currentUser: payload };
    },
    setUsers(state, payload) {
      return { ...state, usersList: payload };
    },
    setUsersPagination(state, payload) {
      return { ...state, userListPagination: payload };
    },
    setPaymentsPagination(state, payload) {
      return { ...state, paymentsListPagination: payload };
    },
    setCurrentUserStatistics(state, payload) {
      return { ...state, currentUserStatistics: payload };
    },
    setUsersJobs(state, payload) {
      return { ...state, usersJobs: payload };
    },
    setTenantProfile(state, payload) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          tenantProfile: { ...state.currentUser.tenantProfile, ...payload },
        },
      };
    },
    setFundingSourcesPagination(state, payload) {
      return { ...state, userFundingSourcesPagination: payload };
    },
    setHasFundingSource(state, payload) {
      return { ...state, hasFundingSource: payload };
    },
    setUserFundingSources(state, payload) {
      return { ...state, userFundingSources: payload };
    },
    setUserDocuments(state, payload) {
      return { ...state, userDocuments: payload };
    },
    setUserDocumentsPagination(state, payload) {
      return { ...state, userDocumentsPagination: payload };
    },
  },
  state: {
    usersList: [],
    currentUser: null,
    userListPagination: null,
    paymentsListPagination: null,
    currentUserStatistics: {
      rank: 0,
      nJobs: 0,
      prev: 0,
      current: 0,
      ytd: 0,
    },
    usersPendingTransactions: null,
    usersPaidTransactions: null,
    usersJobs: null,
    hasFundingSource: true,
    userFundingSources: [],
    userFundingSourcesPagination: null,
    userDocuments: [],
    userDocumentsPagination: null,
  },
};

export default users;
