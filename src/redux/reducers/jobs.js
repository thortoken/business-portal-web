import { types } from '../actions/jobs';

const initialState = {
  jobs: {},
};

export default function jobsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_JOBS.SUCCESS:
      return {
        ...state,
        jobs: action.jobs.reduce((acc, job) => ({ ...acc, [job.id]: job }), {}),
      };

    default:
      return state;
  }
}
