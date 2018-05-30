export const types = {
  SYNC_WALLET: {
    REQUEST: 'SYNC_WALLET.REQUEST',
    SUCCESS: 'SYNC_WALLET.SUCCESS',
    FAILURE: 'SYNC_WALLET.FAILURE',
  },
  SYNC_EXCHANGE_RATES: {
    REQUEST: 'SYNC_EXCHANGE_RATES.REQUEST',
    SUCCESS: 'SYNC_EXCHANGE_RATES.SUCCESS',
    FAILURE: 'SYNC_EXCHANGE_RATES.FAILURE',
  },
};

export const syncExchangeRates = exchangeRates => ({
  type: types.SYNC_EXCHANGE_RATES.REQUEST,
});

export const syncExchangeRatesSuccess = exchangeRates => ({
  type: types.SYNC_EXCHANGE_RATES.SUCCESS,
  exchangeRates,
});

export const syncExchangeRatesFailure = (error, ...args) => {
  console.log('failure args', error, ...args);
  return {
    type: types.SYNC_EXCHANGE_RATES.FAILURE,
    error,
  };
};

export const syncWallet = wallet => ({
  type: types.SYNC_WALLET.REQUEST,
});

export const syncWalletSuccess = wallet => ({
  type: types.SYNC_WALLET.SUCCESS,
  wallet,
});

export const syncWalletFailure = error => ({
  type: types.SYNC_WALLET.FAILURE,
  error,
});
