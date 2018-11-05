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
    async getUsers({ page, limit, startDate, endDate }) {
      try {
        const response = await Http.get(`/users`, {
          params: {
            page,
            limit,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
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
            currentStartDate: currentStartDate.format('YYYY-MM-DD'),
            currentEndDate: currentEndDate.format('YYYY-MM-DD'),
            previousStartDate: previousStartDate.format('YYYY-MM-DD'),
            previousEndDate: previousEndDate.format('YYYY-MM-DD'),
          },
        });

        this.setCurrentUserStatistics(response.data);
      } catch (err) {
        throw err;
      }
    },
    async getUsersJobs({ startDate, endDate, status, page, limit }) {
      try {
        const response = await Http.get(`/users/rating/jobs`, {
          params: {
            limit,
            page,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            status,
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
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
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
  },
};

export default users;
