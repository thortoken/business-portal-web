import { types } from '../actions/transactions';

const initialState = {
  pendingTransactions: [],
  paidTransactions: [],
};

export default function transactionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_TRANSACTIONS.SUCCESS:
      return {
        ...state,
      };
    case types.GET_PENDING_TRANSACTIONS.SUCCESS:
      return {
        ...state,
        pendingTransactions: [...action.pendingTransactions],
      };
    case types.GET_PAID_TRANSACTIONS.SUCCESS:
      return {
        ...state,
        paidTransactions: [...action.paidTransactions],
      };
    default:
      return state;
  }
}
