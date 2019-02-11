import Http from '../services/http';

const documents = {
  effects: {
    async getContractorDocumentList({ page, limit, status, order, orderBy }) {
      try {
        const response = await Http.get('/contractors/documents', {
          params: {
            page,
            limit,
            orderBy,
            order,
            status,
          },
        });
        this.setContractorDocumentList(response.data.items);
        this.setContractorDocumentPagination(response.data.pagination);
      } catch (err) {
        throw err;
      }
    },

    async getContractorDocumentDownloadLink(id) {
      try {
        const response = await Http.get(`/contractors/documents/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async deleteContractorDocument(id) {
      try {
        const response = await Http.delete(`/contractors/documents/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async getUserDocumentList({ userId, page, limit }) {
      try {
        const response = await Http.get(`/users/${userId}/documents`, {
          params: {
            page,
            limit,
          },
        });
        this.setUserDocumentList(response.data.items);
        this.setUserDocumentPagination(response.data.pagination);
      } catch (err) {
        throw err;
      }
    },

    async deleteDocument(id) {
      try {
        const response = await Http.delete(`/documents/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async getDocumentDownloadLink(id) {
      try {
        const response = await Http.get(`/documents/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async unmountUserDocumentList() {
      this.setUserDocumentList([]);
      this.setUserDocumentPagination(null);
    },
  },
  reducers: {
    setContractorDocumentPagination(state, payload) {
      return {
        ...state,
        contractorDocumentPagination: payload,
      };
    },
    setContractorDocumentList(state, payload) {
      return {
        ...state,
        contractorDocumentList: payload,
      };
    },
    setUserDocumentPagination(state, payload) {
      return {
        ...state,
        userDocumentPagination: payload,
      };
    },
    setUserDocumentList(state, payload) {
      return {
        ...state,
        userDocumentList: payload,
      };
    },
  },
  state: {
    contractorDocumentPagination: null,
    contractorDocumentList: [],
    userDocumentList: [],
    userDocumentPagination: null,
  },
};

export default documents;
