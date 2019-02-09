import Http from '~services/http';

const beneficialOwners = {
  effects: {
    async getBeneficialOwners(data) {
      try {
        const response = await Http.get(`/tenants/company/beneficialOwners`, data);
        this.setOwnersListPagination(response.data.pagination);
        this.setOwnersList(response.data.items);
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
    setOwnersListPagination(state, payload) {
      return {
        ...state,
        ownersListPagination: payload,
      };
    },
    setOwnersList(state, payload) {
      return {
        ...state,
        ownersList: payload,
      };
    },
  },
  state: {
    ownersListPagination: null,
    ownersList: [],
  },
};

export default beneficialOwners;
