export const types = {
  SYNC_TRANSACTIONS: {
    REQUEST: 'SYNC_TRANSACTIONS.REQUEST',
    SUCCESS: 'SYNC_TRANSACTIONS.SUCCESS',
    FAILURE: 'SYNC_TRANSACTIONS.FAILURE',
  },
  GET_TRANSACTIONS: {
    REQUEST: 'GET_TRANSACTIONS.REQUEST',
    SUCCESS: 'GET_TRANSACTIONS.SUCCESS',
    FAILURE: 'GET_TRANSACTIONS.FAILURE',
    PAUSE: 'GET_TRANSACTIONS.PAUSE',
  },
  GET_PENDING_TRANSACTIONS: {
    REQUEST: 'GET_PENDING_TRANSACTIONS.REQUEST',
    SUCCESS: 'GET_PENDING_TRANSACTIONS.SUCCESS',
    FAILURE: 'GET_PENDING_TRANSACTIONS.FAILURE',
    PAUSE: 'GET_PENDING_TRANSACTIONS.PAUSE',
  },
  GET_PAID_TRANSACTIONS: {
    REQUEST: 'GET_PAID_TRANSACTIONS.REQUEST',
    SUCCESS: 'GET_PAID_TRANSACTIONS.SUCCESS',
    FAILURE: 'GET_PAID_TRANSACTIONS.FAILURE',
    PAUSE: 'GET_PAID_TRANSACTIONS.PAUSE',
  },
};

export const getPendingTransactions = params => ({
  type: types.GET_PENDING_TRANSACTIONS.REQUEST,
  params,
});

export const getPendingTransactionsSuccess = pendingTransactions => ({
  type: types.GET_PENDING_TRANSACTIONS.SUCCESS,
  pendingTransactions,
});

export const getPendingTransactionsFailure = error => ({
  type: types.GET_PENDING_TRANSACTIONS.FAILURE,
  error,
});

export const pausePendingTransactions = () => ({
  type: types.GET_PENDING_TRANSACTIONS.PAUSE,
});

export const getPaidTransactions = params => ({
  type: types.GET_PAID_TRANSACTIONS.REQUEST,
  params,
});

export const getPaidTransactionsSuccess = paidTransactions => ({
  type: types.GET_PAID_TRANSACTIONS.SUCCESS,
  paidTransactions,
});

export const getPaidTransactionsFailure = error => ({
  type: types.GET_PAID_TRANSACTIONS.FAILURE,
  error,
});

export const pausePaidTransactions = () => ({
  type: types.GET_PAID_TRANSACTIONS.PAUSE,
});

export const getTransactions = params => ({
  type: types.GET_TRANSACTIONS.REQUEST,
  params,
});

export const getTransactionsSuccess = transactions => ({
  type: types.GET_TRANSACTIONS.SUCCESS,
  transactions,
});

export const getTransactionsFailure = error => ({
  type: types.GET_TRANSACTIONS.FAILURE,
  error,
});

export const pauseTransactions = () => ({
  type: types.GET_TRANSACTIONS.PAUSE,
});
