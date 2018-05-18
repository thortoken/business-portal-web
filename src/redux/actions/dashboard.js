export const types = {
  GET_PAYMENTS: {
    REQUEST: 'GET_PAYMENTS.REQUEST',
    SUCCESS: 'GET_PAYMENTS.SUCCESS',
    FAILURE: 'GET_PAYMENTS.FAILURE',
  },
  SYNC_PAYMENTS: {
    REQUEST: 'SYNC_PAYMENTS.REQUEST',
    SUCCESS: 'SYNC_PAYMENTS.SUCCESS',
    FAILURE: 'SYNC_PAYMENTS.FAILURE',
  },
};

export const getPayments = () => ({
  type: types.GET_PAYMENTS.REQUEST,
});

export const getPaymentsSuccess = payments => ({
  type: types.GET_PAYMENTS.SUCCESS,
  payments,
});

export const getPaymentsFailure = error => ({
  type: types.GET_PAYMENTS.FAILURE,
  error,
});

export const syncPayments = payments => ({
  type: types.SYNC_PAYMENTS.REQUEST,
});

export const syncPaymentsSuccess = payments => ({
  type: types.SYNC_PAYMENTS.SUCCESS,
  payments,
});

export const syncPaymentsFailure = error => ({
  type: types.SYNC_PAYMENTS.FAILURE,
  error,
});
