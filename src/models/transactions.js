import Http from '~services/http';

const transactions = {
  effects: {
    async getTransactionsForContractor({ userId, startDate, endDate, status }) {
      try {
        const response = await Http.get(`/users/${userId}/transactions`, {
          params: {
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            status,
          },
        });

        this.setTransactionsForContractor(response.data);
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
  },
  state: {
    transactions: [],
    pendingTransactions: [],
    paidTransactions: [],
    userTransactions: [],
    contractorTransactions: {
      items: [],
    },
  },
};

export default transactions;
