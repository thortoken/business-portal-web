export const types = {
    FETCH_PAYMENTS: {
      REQUEST: 'FETCH_PAYMENTS.REQUEST',
      SUCCESS: 'FETCH_PAYMENTS.SUCCESS',
      FAILURE: 'FETCH_PAYMENTS.FAILURE',
    },
  };
  
  export const fetchPayments = ()=> ({
    type: types.FETCH_PAYMENTS.REQUEST
  });

  export const fetchPaymentsSuccess = (payments)=> ({
    type: types.FETCH_PAYMENTS.SUCCESS,
    payments,
  });

  export const fetchPaymentsFailure = (error)=> ({
    type: types.FETCH_PAYMENTS.FAILURE,
    error,
  });
  