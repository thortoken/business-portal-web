export const types = {
  GET_TRANSACTIONS: {
    REQUEST: 'GET_TRANSACTIONS.REQUEST',
    SUCCESS: 'GET_TRANSACTIONS.SUCCESS',
    FAILURE: 'GET_TRANSACTIONS.FAILURE',
  },
};

export const getTransactions = ({ direction, page, limit, orderBy }) => ({
  type: types.GET_TRANSACTIONS.REQUEST,
  direction,
  page,
  limit,
  orderBy,
});

export const getTransactionsSuccess = (transactions, { direction, page, limit, orderBy }) => ({
  type: types.GET_TRANSACTIONS.SUCCESS,
  transactions,
  direction,
  page,
  limit,
  orderBy,
});

export const getTransactionsFailure = (error, { direction, page, limit, orderBy }) => ({
  type: types.GET_TRANSACTIONS.FAILURE,
  error,
  direction,
  page,
  limit,
  orderBy,
});
