import Http from '~services/http';

const transactions = {
  effects: dispatch => ({
    async createTransaction({ userId, name, value }) {
      try {
        const response = await Http.post('/transactions', {
          quantity: 1,
          userId,
          job: {
            id: null,
            name,
            value,
            description: name,
          },
        });

        dispatch.users.addTransaction({
          userId,
          transaction: response.data,
          type: 'pending',
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
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
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
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
          },
        });
        this.setTransactionsSummary(response.data);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  }),
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
