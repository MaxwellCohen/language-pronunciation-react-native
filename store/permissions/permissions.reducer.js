import * as actions from './permissions.actions';
const initial_state = {
  audio: false,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case actions.UPDATE_PERMISSIONS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
