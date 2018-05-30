import { types } from '../actions/transactions';

const initialState = {
  transactions: [],
};

export default function transactionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SYNC_TRANSACTIONS.SUCCESS:
      return {
        ...state,
        transactions: action.transactions,
      };
    default:
      return state;
  }
}
