import { types } from '../actions/dashboard';

const initialState = {
  payments: [],
};

export default function statusReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_PAYMENTS.SUCCESS:
      return {
        ...state,
        payments: action.payments,
      };
    default:
      return state;
  }
}
