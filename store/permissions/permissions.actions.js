import Permissions from 'react-native-permissions';

export const UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS';

export const checkPermission = () => async (dispatch) => {
  const p = await Permissions.check(
    Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
  );
  if (p === 'authorized') {
    return dispatch({
      type: UPDATE_PERMISSIONS,
      payload: {
        audio: true,
      },
    });
  }
  const pr = await Permissions.request(
    Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
  );
  dispatch({
    type: UPDATE_PERMISSIONS,
    payload: {
      audio: pr,
    },
  });
};
