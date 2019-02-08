import Http from '~services/http';

const tenantCompany = {
  effects: {
    async getCompany() {
      try {
        const response = await Http.get(`/tenants/company`);
        this.setCompany(response.data);
      } catch (err) {
        throw err;
      }
    },
    async getOwner() {
      try {
        const response = await Http.get(`/tenants/company/owner`);
        this.setOwner(response.data);
      } catch (err) {
        throw err;
      }
    },
    async getCategories() {
      try {
        const response = await Http.get(`/tenants/company/businessCategories`);
        this.setCategories(response.data.businessClassifications);
      } catch (err) {
        throw err;
      }
    },
    async getCompanyDetails() {
      try {
        await this.getCompany();
        await this.getOwner();
      } catch (err) {
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
    async editCompanyOwner(data) {
      console.log('edit', data);
      // try {
      //   const response = await Http.patch('/tenants/company', data);
      //   this.setCompany(response.data);
      // } catch (err) {
      //   throw err;
      // }
    },
    async addTenantCompany({ company, owner, controller }) {
      const data = {
        ...company,
        ...owner,
        controller,
      };
      try {
        const response = await Http.post('/tenants/company', data);
        this.setCompany(response.data);
      } catch (err) {
        throw err;
      }
    },
    async retryTenantCompany(data) {
      try {
        const response = await Http.put('/tenants/company', data);
        this.setCompany(response.data);
      } catch (err) {
        throw err;
      }
    },
    async getCompanyDocuments({ id, page, limit }) {
      try {
        const response = await Http.get(`/tenants/company/documents`, {
          params: {
            page,
            limit,
          },
        });
        this.setCompanyDocuments(response.data);
        this.setCompanyDocumentsPagination({
          limit: 10,
          page: 1,
          pages: 1,
          total: 1,
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async unmountCompanyDocuments() {
      this.setCompanyDocuments([]);
      this.setCompanyDocumentsPagination(null);
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
    setCategories(state, payload) {
      return {
        ...state,
        categories: payload,
      };
    },
    setCompanyDocuments(state, payload) {
      return { ...state, companyDocuments: payload };
    },
    setCompanyDocumentsPagination(state, payload) {
      return { ...state, companyDocumentsPagination: payload };
    },
  },
  state: {
    company: null,
    owner: null,
    categories: [],
    companyDocuments: [],
    companyDocumentsPagination: null,
  },
};

export default tenantCompany;
