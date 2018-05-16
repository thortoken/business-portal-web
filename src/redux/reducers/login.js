import { types } from '../actions/login';

const initialState = {
  loading: false,
  loggedIn: false,
  user: null,
  loginError: false,
  loginErrorMsg: '',
  registerError: false,
  registerErrorMsg: '',
  gas: 0,
  neo: 0,
  percent: 0,
  dollars: 0,
};

export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN.REQUEST:
    case types.LOGOUT.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN.SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
      };
    case types.SET_SALE:
      return {
        ...state,
        gas: action.sale.gas,
        neo: action.sale.neo,
        percent: action.sale.percent,
        dollars: action.sale.dollars,
      };
    case types.LOGIN.RESET:
      return {
        ...state,
        loginError: false,
        loginErrorMsg: '',
      };
    case types.LOGIN.FAILURE:
      return {
        ...state,
        loading: false,
        loginError: true,
        loginErrorMsg: action.error.message,
      };
    case types.LOGOUT.SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        user: null,
      };
    case types.LOGOUT.FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.SYNC_USER:
      return {
        ...state,
        loggedIn: action.user != null,
        user: action.user,
      };
    case types.REGISTER.SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.REGISTER.FAILURE:
      return {
        ...state,
        loading: false,
        registerError: true,
        registerErrorMsg: action.error.message,
      };
    case types.REGISTER.RESET:
      return {
        ...state,
        registerError: false,
        registerErrorMsg: '',
      };
    case types.REGISTER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
