import Http from '../services/http';

const documents = {
  effects: {
    async getDocumentList({ page, limit }) {
      try {
        const response = await Http.get('/documents', {
          params: {
            page,
            limit,
          },
        });
        this.setDocumentList(response.data.items);
        this.setDocumentPagination(response.data.pagination);
      } catch (err) {
        throw err;
      }
    },

    async getContractorDocumentList({ page, limit }) {
      try {
        const response = await Http.get('/contractors/documents', {
          params: {
            page,
            limit,
          },
        });
        this.setDocumentList(response.data.items);
        this.setDocumentPagination(response.data.pagination);
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
        this.setDocumentList(response.data.items);
        this.setDocumentPagination(response.data.pagination);
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

    async deleteContractorDocument(id) {
      try {
        const response = await Http.delete(`/contractors/documents/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async deleteUserDocument({ userId, id }) {
      try {
        const response = await Http.delete(`/users/${userId}/documents/${id}`);
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

    async getContractorDocumentDownloadLink(id) {
      try {
        const response = await Http.get(`/contractors/documents/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async getUserDocumentDownloadLink({ userId, id }) {
      try {
        const response = await Http.get(`/users/${userId}/documents/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async changeDocumentIsRequired({ id, isRequired }) {
      try {
        const response = await Http.patch(`/documents/${id}`, { isRequired: !isRequired });
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async updateDocument(data) {
      try {
        const response = await Http.patch(`/documents/${data.id}`, data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },

    async unmountDocumentList() {
      this.setDocumentList([]);
      this.setDocumentPagination(null);
    },
  },
  reducers: {
    setDocumentPagination(state, payload) {
      return {
        ...state,
        documentPagination: payload,
      };
    },
    setDocumentList(state, payload) {
      return {
        ...state,
        documentList: payload,
      };
    },
  },
  state: {
    documentList: [],
    documentPagination: null,
  },
};

export default documents;
