import Http from '~services/http';
import Config from '~services/config';

const tenantCompany = {
  effects: {
    async getCompany() {
      try {
        const response = await Http.get(`/tenants/${Config.tenantId}/company`);
        this.setCompany(response.data);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async getOwner() {
      try {
        const response = await Http.get(`/tenants/${Config.tenantId}/company/owner`);
        this.setOwner(response.data);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async getCompanyDetails() {
      try {
        await this.getCompany();
        await this.getOwner();
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async editTenantCompany(data) {
      try {
        const response = await Http.patch('/tenants/company', data);
        this.setCompany(response.data);
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setCompany(state, payload) {
      return {
        ...state,
        company: payload,
      };
    },
    setOwner(state, payload) {
      return {
        ...state,
        owner: payload,
      };
    },
  },
  state: {
    company: null,
    owner: null,
  },
};

export default tenantCompany;
