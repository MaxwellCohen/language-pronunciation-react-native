const initia_state = {
  userLanguage: 'en', // from
  learningLanguage: 'zh-Hans', // to
  voice: 'zh-CN-Kangkang-Apollo',
};

export default (state = initia_state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
