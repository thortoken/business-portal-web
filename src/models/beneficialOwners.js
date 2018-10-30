import Http from '~services/http';

const beneficialOwners = {
  effects: {
    async getBeneficialOwners(data) {
      try {
        const response = await Http.get(`/tenants/company/beneficialOwners`, data);
        this.setBeneficialPagination(response.data.pagination);
        this.setBeneficialList(response.data.items);
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
