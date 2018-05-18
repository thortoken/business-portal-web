import { types } from '../actions/dashboard';

const initialState = {
  payments: [],
};

export default function dashboardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_PAYMENTS.SUCCESS:
    case types.SYNC_PAYMENTS.SUCCESS:
      return {
        ...state,
        payments: action.payments,
      };
    default:
      return state;
  }
}
