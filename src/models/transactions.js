import Http from '~services/http';

const transactions = {
  effects: {
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
  },
  reducers: {
    setTransactionsForContractor(state, payload) {
      return { ...state, contractorTransactions: payload };
    },
    setTransactionsPagination(state, payload) {
      return { ...state, transactionsListPagination: payload };
    },
  },
  state: {
    transactions: [],
    transactionsListPagination: null,
    pendingTransactions: [],
    paidTransactions: [],
    userTransactions: [],
    contractorTransactions: {
      items: [],
    },
  },
};

export default transactions;
