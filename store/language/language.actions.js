export const SET_USER_LANGUAGE = 'SET_USER_LANGUAGE';
export const SET_LEARNING_LANGUAGE = 'SET_LEARNING_LANGUAGE';
export const SET_VOICE = 'SET_VOICE';

export const setUserLanguage = (userLanguage) => ({
  type: SET_USER_LANGUAGE,
  payload: {
    userLanguage,
  },
});

export const setLearningLanguage = (learningLanguage) => ({
  type: SET_LEARNING_LANGUAGE,
  payload: {
    learningLanguage,
  },
});

export const setVoice = (voice) => ({
  type: SET_VOICE,
  payload: {
    voice,
  },
});
