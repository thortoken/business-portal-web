export const types = {
  GET_JOBS: {
    REQUEST: 'GET_JOBS.REQUEST',
    SUCCESS: 'GET_JOBS.SUCCESS',
    FAILURE: 'GET_JOBS.FAILURE',
    PAUSE: 'GET_JOBS.PAUSE',
  },
};

export const getJobs = params => ({
  type: types.GET_JOBS.REQUEST,
  params,
});

export const getJobsSuccess = jobs => ({
  type: types.GET_JOBS.SUCCESS,
  jobs,
});

export const getJobsFailure = error => ({
  type: types.GET_JOBS.FAILURE,
  error,
});

export const pauseJobs = () => ({
  type: types.GET_JOBS.PAUSE,
});
