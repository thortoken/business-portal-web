import Http from '../services/http';

const payments = {
  effects: {
    async payNow(data) {
      let errorList = new Set();
      let error = 0;
      let done = 0;

      let requests = [...data].map(group => {
        return Http.post(`/transactions/transfers`, {
          transactionsIds: group.transactionsIds,
        })
          .then(res => {
            done += group.transactionsIds.length;
            this.setTransactionDone(done);
          })
          .catch(err => {
            if (err.response.status === 500) {
              const error = JSON.parse(err.response.data.error);
              if (error.message.includes('embedded')) {
                error._embedded.errors.forEach(err => {
                  errorList.add(err.message);
                });
              } else {
                errorList.add('Internal error server.');
              }
            } else {
              errorList.add(err.response.data.error);
            }
            error += group.transactionsIds.length;
            this.setTransactionError(error);
          });
      });
      await Promise.all(requests).then(res => {
        this.setTransactionErrorList(errorList);
        this.setResetTransactionsFlag(true);
      });
    },
    async updatePaymentsList(data) {
      this.setTransactionsIds(data.selectedTransactionsIds);
      this.setContractorsIds(data.selectedContractorsIds);
      this.setTransactionsSummaryValues(data.selectedTransactionsSummaryValue);
      this.setTransactionGroups(data.selectedTransactionGroups);
    },
    async reset() {
      this.setTransactionsIds(new Set());
      this.setContractorsIds(new Set());
      this.setTransactionErrorList(new Set());
      this.setTransactionsSummaryValues(0);
      this.setTransactionError(0);
      this.setTransactionDone(0);
      this.setTransactionGroups([]);
      this.setResetTransactionsFlag(false);
    },
  },
  reducers: {
    setTransactionsIds(state, payload) {
      return { ...state, selectedTransactionsIds: payload };
    },
    setContractorsIds(state, payload) {
      return { ...state, selectedContractorsIds: payload };
    },
    setTransactionGroups(state, payload) {
      return { ...state, selectedTransactionGroups: payload };
    },
    setTransactionsSummaryValues(state, payload) {
      return { ...state, selectedTransactionsSummaryValue: payload };
    },
    setTransactionError(state, payload) {
      return { ...state, transactionsError: payload };
    },
    setTransactionDone(state, payload) {
      return { ...state, transactionsDone: payload };
    },
    setTransactionErrorList(state, payload) {
      return { ...state, transactionErrorList: new Set([...payload]) };
    },
    setResetTransactionsFlag(state, payload) {
      return { ...state, resetTransactions: payload };
    },
  },
  state: {
    selectedTransactionsIds: new Set(),
    selectedContractorsIds: new Set(),
    selectedTransactionGroups: [],
    selectedTransactionsSummaryValue: 0,
    transactionErrorList: new Set(),
    transactionsError: 0,
    transactionsDone: 0,
    resetTransactions: false,
  },
};

export default payments;
