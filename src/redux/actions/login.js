export const types = {
  LOGIN: {
    REQUEST: 'LOGIN.REQUEST',
    SUCCESS: 'LOGIN.SUCCESS',
    FAILURE: 'LOGIN.FAILURE',
    TWITTER: 'LOGIN.TWITTER',
    GOOGLE: 'LOGIN.GOOGLE',
    RESET: 'LOGIN.RESET',
  },
  REGISTER: {
    REQUEST: 'REGISTER.REQUEST',
    SUCCESS: 'REGISTER.SUCCESS',
    FAILURE: 'REGISTER.FAILURE',
    RESET: 'REGISTER.RESET',
  },
  LOGOUT: {
    REQUEST: 'LOGOUT.REQUEST',
    SUCCESS: 'LOGOUT.SUCCESS',
    FAILURE: 'LOGOUT.FAILURE',
  },
  SYNC_USER: 'SYNC_USER',
  TEST: 'TEST',
  RESET_PASSWORD: 'RESET_PASSWORD',
  SET_SALE: 'SET_SALE',
  GET_SALE: 'GET_SALE',
};

export const loginEmlPwd = (email, password, route) => ({
  type: types.LOGIN.REQUEST,
  email,
  password,
});

export const loginGoogle = route => ({
  type: types.LOGIN.GOOGLE,
  route,
});

export const loginTwitter = route => ({
  type: types.LOGIN.TWITTER,
  route,
});

export const loginSuccess = user => ({
  type: types.LOGIN.SUCCESS,
  user,
});

export const testDB = () => ({
  type: types.TEST,
});

export const loginFailure = error => ({
  type: types.LOGIN.FAILURE,
  error,
});

export const resetLoginFailure = () => ({
  type: types.LOGIN.RESET,
});

export const logout = () => ({
  type: types.LOGOUT.REQUEST,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT.SUCCESS,
});

export const logoutFailure = error => ({
  type: types.LOGOUT.FAILURE,
  error,
});

export const syncUser = user => ({
  type: types.SYNC_USER,
  user,
});

export const register = (email, password) => ({
  type: types.REGISTER.REQUEST,
  email,
  password,
});

export const registerSuccess = user => ({
  type: types.REGISTER.SUCCESS,
  user,
});

export const registerFailure = error => ({
  type: types.REGISTER.FAILURE,
  error,
});

export const setSale = sale => ({
  type: types.SET_SALE,
  sale,
});

export const getSale = sale => ({
  type: types.GET_SALE,
  sale,
});

export const resetRegisterFailure = () => ({
  type: types.REGISTER.RESET,
});

export const resetPassword = email => ({
  type: types.RESET_PASSWORD,
  email,
});
