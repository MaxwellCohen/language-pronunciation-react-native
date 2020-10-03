import * as Actions from './language.actions';
// const initial_state = {
//   userLanguage: 'en', // from
//   learningLanguage: 'zh-Hans', // to
//   voice: 'zh-CN-Kangkang-Apollo',
// };
const initial_state = {
  userLanguage: '', // from
  learningLanguage: '', // to
  voice: '',
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case Actions.SET_USER_LANGUAGE:
      return {
        ...state,
        userLanguage: action.payload.userLanguage,
      };
    case Actions.SET_LEARNING_LANGUAGE:
      const learningLanguage = action.payload.learningLanguage;
      const voice = state.voice.startsWith(learningLanguage.split('-')[0])
        ? state.voice
        : '';
      return {
        ...state,
        voice,
        learningLanguage,
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
