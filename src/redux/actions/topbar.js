export const types = {
  ON_CHANGE_AUTO_RENEW: 'ON_CHANGE_AUTO_RENEW',
  GET_RENEW_STATE: 'GET_RENEW_STATE',
  GET_PAYMENTS_DAYS_LEFT: 'GET_PAYMENTS_DAYS_LEFT',
  GET_BALANCE: 'GET_BALANCE',
};

export const getBalance = () => ({
  type: types.GET_BALANCE,
});

export const getPaymentDaysLeft = () => ({
  type: types.GET_PAYMENTS_DAYS_LEFT,
});

export const getRenewState = () => ({
  type: types.GET_RENEW_STATE,
});

export const changeRenewState = isAutoRenewOn => ({
  type: types.ON_CHANGE_AUTO_RENEW,
  isAutoRenewOn,
});
