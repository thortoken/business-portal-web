import Http from '../services/http';

const documents = {
  effects: {
    async getDocuments({ page, limit, status, order, orderBy }) {
      try {
        const response = await Http.get('/documents', {
          params: {
            page,
            limit,
            orderBy,
            order,
            status,
          },
        });
        this.setDocumentsList(response.data.items);
        this.setDocumentsPagination(response.data.pagination);
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

    async deleteDocument(id) {
      try {
        const response = await Http.delete(`/documents/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setDocumentsPagination(state, payload) {
      return {
        ...state,
        documentsListPagination: payload,
      };
    },
    setDocumentsList(state, payload) {
      return {
        ...state,
        documentsList: payload,
      };
    },
  },
  state: {
    documentsListPagination: null,
    documentsList: [],
  },
};

export default documents;
