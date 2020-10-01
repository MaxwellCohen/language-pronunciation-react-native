import * as actions from './token.actions';
const initial_state = {
  token: null,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case actions.RESET_TOKEN:
      return {
        ...initial_state,
      };
    case actions.SET_TOKEN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
