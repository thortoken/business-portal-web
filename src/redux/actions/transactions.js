export const types = {
  SYNC_TRANSACTIONS: {
    REQUEST: 'SYNC_TRANSACTIONS.REQUEST',
    SUCCESS: 'SYNC_TRANSACTIONS.SUCCESS',
    FAILURE: 'SYNC_TRANSACTIONS.FAILURE',
  },
};

export const syncTransactions = transactions => ({
  type: types.SYNC_TRANSACTIONS.REQUEST,
});

export const syncTransactionsSuccess = transactions => ({
  type: types.SYNC_TRANSACTIONS.SUCCESS,
  transactions,
});

export const syncTransactionsFailure = error => ({
  type: types.SYNC_TRANSACTIONS.FAILURE,
  error,
});
