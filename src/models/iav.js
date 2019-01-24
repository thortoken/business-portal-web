import Http from '~services/http';

const iav = {
  effects: {
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
    setIavToken(state, payload) {
      return { ...state, iavToken: payload };
    },
  },
  state: {
    iavToken: '',
  },
};

export default iav;
