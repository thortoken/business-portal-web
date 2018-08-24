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
    async update({ id, data }) {
      try {
        const response = await Http.patch(`/users/${id}/profile`, data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {},
  state: {},
};

export default users;
