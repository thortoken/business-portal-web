import { types } from '../actions/transactions';

const initialState = {
  transactions: [],
  direction: null,
  page: 1,
  limit: 10,
  orderBy: null,
  isLoading: false,
  hasError: false,
  errorMessage: null,
};

export default function transactionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_TRANSACTIONS.REQUEST:
      return {
        ...state,
        direction: action.direction,
        page: action.page,
        limit: action.limit,
        orderBy: action.orderBy,
        isLoading: true,
        hasError: false,
        errorMessage: null,
      };
    case types.GET_TRANSACTIONS.SUCCESS:
      return {
        ...state,
        transactions: action.transactions,
        isLoading: false,
      };
    case types.GET_TRANSACTIONS.FAILURE:
      return {
        ...state,
        transactions: [],
        hasError: true,
        errorMessage: action.error,
      };
    default:
      return state;
  }
}
