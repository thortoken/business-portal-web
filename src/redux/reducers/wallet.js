import { types } from '../actions/wallet';
import { convertDateFields } from './utils';

const initialState = {
  wallet: {},
  exchangeRates: {
    'thor-usd': {},
  },
};

export default function walletReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SYNC_WALLET.SUCCESS:
      return {
        ...state,
        wallet: action.wallet,
      };
    case types.SYNC_EXCHANGE_RATES.SUCCESS:
      return {
        ...state,
        exchangeRates: action.exchangeRates.reduce((acc, rate) => {
          const rateWithDates = convertDateFields(rate, ['date']);
          return { ...acc, [rateWithDates.type]: rateWithDates };
        }, state.exchangeRates),
      };
    default:
      return state;
  }
}
