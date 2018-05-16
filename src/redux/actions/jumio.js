export const types = {
  JUMIO: {
    REQUEST: 'JUMIO.REQUEST',
    SUCCESS: 'JUMIO.SUCCESS',
    FAILURE: 'JUMIO.FAILURE',
  },
  SET_TOKEN: 'SET_TOKEN',
};

export const getToken = () => ({
  type: types.JUMIO.REQUEST,
});

export const getTokenFailure = error => ({
  type: types.JUMIO.FAILURE,
  error,
});

export const getTokenSuccess = token => ({
  type: types.JUMIO.SUCCESS,
  token,
});
