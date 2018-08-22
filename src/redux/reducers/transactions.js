import { types } from '../actions/transactions';

const initialState = {
  pendingTransactions: [],
  paidTransactions: [],
  userTransactions: [],
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
    case types.GET_USER_TRANSACTIONS.SUCCESS:
      return {
        ...state,
        userTransactions: [...action.userTransactions],
      };
    default:
      return state;
  }
}
