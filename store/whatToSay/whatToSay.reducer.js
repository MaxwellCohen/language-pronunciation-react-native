import * as Actions from './whatToSay.actions';
import * as languageActions from '../language/language.actions';
const initial_state = {
  text: '',
  transliteration: '',
  translation: '',
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
    case languageActions.SET_USER_LANGUAGE:
      return initial_state;
    case languageActions.SET_LEARNING_LANGUAGE:
      return initial_state;
    default:
      return state;
  }
};
