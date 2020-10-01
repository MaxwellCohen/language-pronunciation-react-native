import speechAPI from '../../api/speech';
export const UPDATE_TEXT = 'UPDATE_TEXT';
export const UPDATE_TRANSLATION = 'UPDATE_TRANSLATION';
export const UPDATE_All = 'UPDATE_TRANSLATION';

export const updateText = (text) => {
  return {
    type: UPDATE_TEXT,
    payload: {
      text,
    },
  };
};
export const updateTranslation = (translation) => {
  return {
    type: UPDATE_TRANSLATION,
    payload: {
      translation,
    },
  };
};
export const updateAll = ({text, transliteration, translation}) => {
  return {
    type: UPDATE_TRANSLATION,
    payload: {
      text,
      transliteration,
      translation,
    },
  };
};

export const newTranslation = ({text, to, from}) => async (dispatch) => {
  try {
    const {data} = await speechAPI.get('/translate', {
      params: {text, to, from},
    });
    dispatch({
      type: UPDATE_All,
      payload: {
        text: data.translation,
        translation: data.text,
        transliteration: data.textTransliteration,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const newText = ({text, to, from}) => async (dispatch) => {
  try {
    const {data} = await speechAPI.get('/translate', {
      params: {text, to, from},
    });
    dispatch({
      type: UPDATE_All,
      payload: {
        text: data.text,
        translation: data.translation,
        transliteration: data.translationTransliteration,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
