import Http from '../services/http';

const payments = {
  effects: {
    async updatePaymentsList(data) {
      this.setTransactionsIds(data.selectedTransactionsIds);
      this.setContractorsIds(data.selectedContractorsIds);
      this.setTransactionsSummaryValues(data.selectedTransactionsSummaryValue);
    },
  },
  reducers: {
    setTransactionsIds(state, payload) {
      return { ...state, selectedTransactionsIds: payload };
    },
    setContractorsIds(state, payload) {
      return { ...state, selectedContractorsIds: payload };
    },
    setTransactionsSummaryValues(state, payload) {
      return { ...state, selectedTransactionsSummaryValue: payload };
    },
  },
  state: {
    selectedTransactionsIds: new Set(),
    selectedContractorsIds: new Set(),
    selectedTransactionsSummaryValue: 0,
  },
};

export default payments;
