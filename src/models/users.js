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
  },
  reducers: {
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
  },
};

export default users;
