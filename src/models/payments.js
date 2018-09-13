import Http from '../services/http';

function delayed() {
  return new Promise(res => setTimeout(res, 300));
}

const payments = {
  effects: {
    async payNow(data) {
      let list = new Set(data);
      this.setTransactionList(list);
      for (const id of data) {
        try {
          await Http.post(`/transactions/${id}/transfer`);
          // await delayed();
          list.delete(id);
          this.setTransactionList(list);
        } catch (err) {
          throw err;
        }
      }
      this.setTransactionList(list);
    },
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
    setTransactionList(state, payload) {
      return { ...state, transactionList: new Set([...payload]) };
    },
  },
  state: {
    selectedTransactionsIds: new Set(),
    selectedContractorsIds: new Set(),
    selectedTransactionsSummaryValue: 0,
    transactionList: new Set(),
  },
};

export default payments;
