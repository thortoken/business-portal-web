import Http from '~services/http';

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
        const response = await Http.post(`/users/${id}/fundingSource`, data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async updateProfile({ id, profile }) {
      try {
        const response = await Http.patch(`/users/${id}/profile`, { profile });
        this.setProfile(profile);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async get(id) {
      try {
        const response = await Http.get(`/users/${id}`);
        this.setCurrent(response.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async getUsersWithTransactions({ startDate, endDate, status }) {
      try {
        const response = await Http.get(`/users?embed=transactions`, {
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
          status,
        });

        if (status === 'done') {
          this.setUsersPaidTransactions(response.data);
        } else if (status === 'new') {
          this.setUsersPendingTransactions(response.data);
        } else {
          this.setUsersTransactions(response.data);
        }

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
    setProfile(state, payload) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          profile: { ...state.currentUser.profile, ...payload },
        },
      };
    },
  },
  state: {
    currentUser: null,
    usersPendingTransactions: null,
    usersPaidTransactions: null,
  },
};

export default users;
