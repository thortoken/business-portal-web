import Http from '~services/http';

const transactions = {
  effects: {
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
    async getTransactionsForContractorByJobId({ userId, jobId, startDate, endDate }) {
      try {
        const response = await Http.get(`/transactions/${userId}`, {
          params: {
            jobId,
            startDate,
            endDate,
          },
        });

        this.setTransactionsForContractorByJobId(response.data);
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
  },
  reducers: {
    setTransactionsForContractor(state, payload) {
      return { ...state, contractorTransactions: payload };
    },
    setTransactionsForContractorByJobId(state, payload) {
      return { ...state, userTransactionsByJob: payload };
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
    userTransactionsByJob: [
      {
        quantity: 1,
        userId: '5bc31a16-08df-475c-8e88-6734d9f819b7',
        location: 'Los Angeles',
        id: '8f9f717a-53c0-4e44-9e1b-45973efe83d1',
        status: 'new',
        createdAt: '2018-09-18T14:04:10.372Z',
        updatedAt: '2018-09-18T14:04:10.372Z',
        job: {
          id: 'b59bddb2-bb4b-11e8-8562-6a00039c60e0',
          value: '4.75',
          name: 'Oil change',
          description: 'Changing engine oil',
        },
        value: 4.75,
      },
      {
        quantity: 1,
        userId: '5bc31a16-08df-475c-8e88-6734d9f819b7',
        location: 'San Francisco',
        id: 'b8805781-7923-46e4-a298-05345f815e18',
        status: 'new',
        createdAt: '2018-09-18T14:04:11.322Z',
        updatedAt: '2018-09-18T14:04:11.322Z',
        job: {
          id: 'b59bddb2-bb4b-11e8-8562-6a00039c60e0',
          value: '4.75',
          name: 'Oil change',
          description: 'Changing engine oil',
        },
        value: 4.75,
      },
      {
        quantity: 1,
        userId: '5bc31a16-08df-475c-8e88-6734d9f819b7',
        location: 'San Jose',
        id: 'b8805781-7923-46e4-a298-05345f815e19',
        status: 'new',
        createdAt: '2018-09-19T14:10:11.322Z',
        updatedAt: '2018-09-19T14:10:11.322Z',
        job: {
          id: 'b59bddb2-bb4b-11e8-8562-6a00039c60e0',
          value: '4.75',
          name: 'Oil change',
          description: 'Changing engine oil',
        },
        value: 4.75,
      },
    ],
    contractorTransactions: {
      items: [],
    },
  },
};

export default transactions;
