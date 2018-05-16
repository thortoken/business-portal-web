export const types = {
  SAVE_STATUS: 'SAVE_STATUS',
  SUBMIT_INFO: {
    REQUEST: 'SUBMIT_INFO.REQUEST',
    SUCCESS: 'SUBMIT_INFO.SUCCESS',
    FAILURE: 'SUBMIT_INFO.FAILURE',
  },
  GET_STATUS: 'GET_STATUS',
  RESET_KYC: 'RESET_KYC',
  UPDATE_NEO_ADDRESS: 'UPDATE_NEO_ADDRESS',
};

export const saveStatus = info => ({
  type: types.SAVE_STATUS,
  info,
});

export const submitInfo = info => ({
  type: types.SUBMIT_INFO.REQUEST,
  info,
});

export const submitInfoSuccess = () => ({
  type: types.SUBMIT_INFO.SUCCESS,
});

export const submitInfoFailure = () => ({
  type: types.SUBMIT_INFO.FAILURE,
});

export const getStatus = () => ({
  type: types.GET_STATUS,
});

export const resetKYC = () => ({
  type: types.RESET_KYC,
});

export const updateNEOAddress = neo_wallet => ({
  type: types.UPDATE_NEO_ADDRESS,
  neo_wallet,
});
