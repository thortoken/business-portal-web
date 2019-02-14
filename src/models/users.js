import Http from '~services/http';

const users = {
  effects: dispatch => ({
    async addAdmin(data) {
      try {
        const response = await Http.post('/users/admins', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async addContractor(data) {
      try {
        const response = await Http.post('/users/contractors', data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async updateProfile(data) {
      try {
        const response = await Http.patch('/profiles', data);
        // update the user status
        await dispatch.auth.saveUser(response.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async updateTenantProfile({ userId, tenantProfile }) {
      try {
        const response = await Http.patch(`/users/${userId}/profiles`, { profile: tenantProfile });
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

    async sendPasswordReset(userId) {
      try {
        const response = await Http.post(`/users/${userId}/passwordReset`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async getUsers({ startDate, endDate, status, page, limit, orderBy, order, name }) {
      try {
        const response = await Http.get(`/users`, {
          params: {
            page,
            limit,
            startDate: new Date(startDate.utc()),
            endDate: new Date(endDate.utc()),
            orderBy,
            order,
            status,
            name,
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
      userId,
      currentStartDate,
      currentEndDate,
      previousStartDate,
      previousEndDate,
    }) {
      try {
        const response = await Http.get(`/users/${userId}/statistics`, {
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

    async getUsersJobs({ startDate, endDate, status, page, limit, orderBy, order, name }) {
      try {
        const response = await Http.get(`/users/rating/jobs`, {
          params: {
            limit,
            page,
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            status,
            orderBy,
            order,
            name,
          },
        });
        const res = response.data.items.map(userJob => {
          return { ...userJob, name: `${userJob.firstName} ${userJob.lastName}` };
        });
        this.setUsersJobs(res);
        this.setPaymentPagination(response.data.pagination);
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
        this.setPaymentPagination(response.data.pagination);

        return response.data;
      } catch (err) {
        throw err;
      }
    },
  }),
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
    setPaymentPagination(state, payload) {
      return { ...state, paymentPagination: payload };
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
  },
  state: {
    usersList: [],
    currentUser: null,
    userListPagination: null,
    paymentPagination: null,
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
  },
};

export default users;
