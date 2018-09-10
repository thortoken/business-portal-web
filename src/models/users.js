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
    async getUser(id) {
      try {
        const response = await Http.get(`/users/${id}`);
        this.setCurrent(response.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async getUsers({page, limit, startDate, endDate}) {
      try {
        this.setUsersListLoading(true);
        const response = await Http.get(`/users`, {
          params: {
            page: page,
            limit: limit,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
          },
        });
        this.setUsers(response.data.items);
        this.setUsersPagination(response.data.pagination);
        this.setUsersListLoading(false);
        return response.data.items;
      } catch (err) {
        this.setUsersListLoading(false);
        throw err;
      }
    },
    async getUsersWithTransactions({ startDate, endDate, status }) {
      try {
        const response = await Http.get(`/users`, {
          params: {
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
      return { ...state, usersList: payload }
    },
    setUsersPagination(state, payload){
      return { ...state, userListPagination: payload }
    },
    setUsersListLoading(state, payload){
      return { ...state, usersListLoading: payload}
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
    usersList: [],
    currentUser: null,
    userListPagination: null,
    usersPendingTransactions: null,
    usersPaidTransactions: null,
    usersListLoading: false,
  },
};

export default users;
