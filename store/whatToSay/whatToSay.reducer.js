import * as Actions from './whatToSay.actions';
const initial_state = {
  text: 'hello',
  transliteration: 'Nǐ hǎo',
  translation: '你好',
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case Actions.UPDATE_All:
      return action.payload;
    case Actions.UPDATE_TEXT:
      return {
        text: action.payload.text,
        transliteration: '',
        translation: '',
      };
    case Actions.UPDATE_TRANSLATION:
      return {
        text: '',
        transliteration: '',
        translation: action.payload.translation,
      };
    default:
      return state;
  }
};
