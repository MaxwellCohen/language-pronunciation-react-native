import * as Actions from './language.actions';
const initial_state = {
  userLanguage: 'en', // from
  learningLanguage: 'zh-Hans', // to
  voice: 'zh-CN-Kangkang-Apollo',
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case Actions.SET_USER_LANGUAGE:
      return {
        ...state,
        userLanguage: action.payload.userLanguage,
      };
    case Actions.SET_LEARNING_LANGUAGE:
      return {
        ...state,
        voice: '',
        learningLanguage: action.payload.learningLanguage,
      };
    case Actions.SET_VOICE:
      return {
        ...state,
        voice: action.payload.voice,
      };
    default:
      return state;
  }
};
