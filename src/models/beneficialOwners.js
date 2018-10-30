import Http from '~services/http';

const beneficialOwners = {
  effects: {
    async getBeneficialOwners(data) {
      try {
        const response = await Http.get(`/tenants/company/beneficialOwners`, data);
        this.setBeneficialPagination({
          limit: 10,
          page: 1,
          pages: 1,
          total: 0,
        });
        this.setBeneficialList([]);
      } catch (err) {
        throw err;
      }
    },
    async createBeneficialOwner(data) {
      try {
        const response = await Http.post(`/tenants/company/beneficialOwners`, data);
        console.log(response.data);
      } catch (err) {
        console.log(err.response);
        throw err;
      }
    },
  },
  reducers: {
    setBeneficialPagination(state, payload) {
      return {
        ...state,
        beneficialListPagination: payload,
      };
    },
    setBeneficialList(state, payload) {
      return {
        ...state,
        beneficialList: payload,
      };
    },
  },
  state: {
    beneficialListPagination: null,
    beneficialList: [],
  },
};

export default beneficialOwners;
