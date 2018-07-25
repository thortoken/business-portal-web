import { types } from '../actions/topbar';

const initialState = {
  isAutoRenewOn: true,
  balanceValue: 7010,
  paymentDaysLeft: 6,
};

export default function topbarReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ON_CHANGE_AUTO_RENEW:
      return {
        ...state,
        isAutoRenewOn: action.isAutoRenewOn,
      };
    case types.GET_RENEW_STATE:
      return {
        ...state,
      };
    case types.GET_PAYMENTS_DAYS_LEFT:
      return {
        ...state,
      };
    case types.GET_BALANCE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
