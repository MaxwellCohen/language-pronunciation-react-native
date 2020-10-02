import * as Actions from './whatToSay.actions';
const initial_state = {
  text: 'hello',
  transliteration: 'Nǐ hǎo',
  translation: '你好',
  sound: null,
  audioFile: null,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case Actions.SET_TRANSLATION_INFO:
      return {
        ...initial_state,
        ...action.payload,
      };
    case Actions.SET_TEXT:
      return {
        ...initial_state,
        text: action.payload.text,
        transliteration: '',
        translation: '',
      };
    case Actions.SET_TRANSLATION:
      return {
        ...initial_state,
        text: '',
        transliteration: '',
        translation: action.payload.translation,
      };
    case Actions.SET_SOUND:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
