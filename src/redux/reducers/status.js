import { types } from '../actions/status';

const initialState = {
  info: null,
};

export default function statusReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SAVE_STATUS:
      return {
        ...state,
        info: action.info,
      };
    default:
      return state;
  }
}
