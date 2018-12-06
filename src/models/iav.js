import Http, { setAuthHeader } from '~services/http';

const iav = {
  effects: {
    async getIavToken({ token, type, data }) {
      let response = null;
      try {
        switch (type) {
          case 'contractors':
            setAuthHeader(token);
            response = await Http.get(`/${type}/fundingSources/iav`);
            break;
          case 'users':
            response = await Http.get(`/${type}/${data.userId}/fundingSources/iav`);
            break;
          default:
            response = await Http.get(`/tenants/company/fundingSources/iav`);
        }

        this.setIavToken(response.data.token);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setIavToken(state, payload) {
      return { ...state, iavToken: payload };
    },
  },
  state: {
    iavToken: '',
  },
};

export default iav;
