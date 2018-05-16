import { types } from '../actions/jumio';

const initialState = {
  authToken: null,
};

export default function jumioReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.JUMIO.SUCCESS:
      return {
        ...state,
        authToken: action.token.data.authorizationToken,
      };
    default:
      return state;
  }
}
