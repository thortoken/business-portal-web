import Http from '~services/http';

const beneficialOwners = {
  effects: {
    async getBeneficialOwners(data) {
      try {
        const response = await Http.get(`/tenants/company/beneficialOwners`, data);
        this.setBeneficialOwnerPagination(response.data.pagination);
        this.setBeneficialOwnerList(response.data.items);
        return response.data.items;
      } catch (err) {
        throw err;
      }
    },

    async createBeneficialOwner(data) {
      try {
        const response = await Http.post(`/tenants/company/beneficialOwners`, data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async deleteBeneficialOwner(id) {
      try {
        const response = await Http.delete(`/tenants/company/beneficialOwners/${id}`);
        return response;
      } catch (err) {
        console.log(err.response);
        throw err;
      }
    },
  },
  reducers: {
    setBeneficialOwnerPagination(state, payload) {
      return {
        ...state,
        beneficialOwnerPagination: payload,
      };
    },
    setBeneficialOwnerList(state, payload) {
      return {
        ...state,
        beneficialOwnerList: payload,
      };
    },
  },
  state: {
    beneficialOwnerPagination: null,
    beneficialOwnerList: [],
  },
};

export default beneficialOwners;
