import Permissions, {PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';

export const UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS';

export const checkPermission = () => async (dispatch) => {
  const cameraPermission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.RECORD_AUDIO
      : PERMISSIONS.IOS.CAMERA;
  try {
    const p = await Permissions.check(cameraPermission);
    if (p === 'authorized') {
      return dispatch({
        type: UPDATE_PERMISSIONS,
        payload: {
          audio: true,
        },
      });
    }
    const pr = await Permissions.request(cameraPermission);
    dispatch({
      type: UPDATE_PERMISSIONS,
      payload: {
        audio: pr,
      },
    });
  } catch (e) {}
};
