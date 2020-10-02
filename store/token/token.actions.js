import speechApi from '../../api/speech';

export const SET_TOKEN = 'SET_TOKEN';
export const RESET_TOKEN = 'RESET_TOKEN';

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: {
    token,
  },
});

export const resetToken = () => ({
  type: RESET_TOKEN,
});

export const getToken = () => async (dispatch) => {
  console.log('resquest token');
  dispatch(resetToken());
  try {
    const request = await speechApi.get('/token');
    dispatch(setToken(request?.data?.token));
  } catch (e) {
    console.error('token error', e);
  }
};
