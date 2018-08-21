export const types = {
  GET_CONTRACTOR: {
    REQUEST: 'GET_CONTRACTOR.REQUEST',
    SUCCESS: 'GET_CONTRACTOR.SUCCESS',
    FAILURE: 'GET_CONTRACTOR.FAILURE',
    PAUSE: 'GET_CONTRACTOR.PAUSE',
  },
};

export const getContractor = params => ({
  type: types.GET_CONTRACTOR.REQUEST,
  params,
});

export const getContractorSuccess = jobs => ({
  type: types.GET_CONTRACTOR.SUCCESS,
  jobs,
});

export const getContractorFailure = error => ({
  type: types.GET_CONTRACTOR.FAILURE,
  error,
});

export const pauseContractor = () => ({
  type: types.GET_CONTRACTOR.PAUSE,
});
