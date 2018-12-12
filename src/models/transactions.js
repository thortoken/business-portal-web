import Http from '~services/http';

const transactions = {
  effects: {
    async addCustomTransaction({ userId, name, value }) {
      try {
        const response = await Http.post('/transactions/custom', {
          userId,
          value,
          job: {
            name,
            value,
            description: name,
            isCustom: true,
          },
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async createTransaction({ userId, name, value }) {
      try {
        const response = await Http.post('/transactions/custom', {
          userId,
          value: null,
          job: {
            name,
            value,
            description: name,
          },
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async getTransactionsForContractor({ userId, startDate, endDate, status, page, limit }) {
      try {
        const response = await Http.get(`/users/${userId}/transactions`, {
          params: {
            page,
            limit,
            startDate: new Date(startDate.utc()),
            endDate: new Date(endDate.utc()),
            status,
          },
        });
        this.setTransactionsForContractor(response.data);
        this.setTransactionsPagination(response.data.pagination);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async getTransactionsSummary({ page, limit, status, startDate, endDate }) {
      try {
        const response = await Http.get(`/transactions/rating/period`, {
          params: {
            page,
            limit,
            startDate: new Date(startDate.utc()),
            endDate: new Date(endDate.utc()),
          },
        });
        this.setTransactionsSummary(response.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    async deleteTransaction(id) {
      try {
        await Http.delete(`/transactions/${id}`);
      } catch (err) {
        throw err;
      }
    },
  },
  reducers: {
    setTransactionsForContractor(state, payload) {
      return { ...state, contractorTransactions: payload };
    },
    setTransactionsPagination(state, payload) {
      return { ...state, transactionsListPagination: payload };
    },
    setTransactionsSummary(state, payload) {
      return { ...state, transactionsSummary: payload };
    },
  },
  state: {
    transactions: [],
    transactionsListPagination: null,
    transactionsSummary: null,
    pendingTransactions: [],
    paidTransactions: [],
    userTransactions: [],
    contractorTransactions: {
      items: [],
    },
  },
};

export default transactions;
