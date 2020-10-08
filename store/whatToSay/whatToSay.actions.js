import {translate, tts} from '../../api/speech';
import RNFS from 'react-native-fs';
import {loadAudio} from '../../util/sound';
import { removePunctuation } from '../../util/removePunctuation';

export const SET_TEXT = 'SET_TEXT';
export const SET_TRANSLATION = 'SET_TRANSLATION';
export const SET_TRANSLATION_INFO = 'SET_TRANSLATION_INFO';
export const SET_SOUND = 'SET_SOUND';

export const setText = (text) => {
  return {
    type: SET_TEXT,
    payload: {
      text,
    },
  };
};
export const setTranslation = (translation) => {
  return {
    type: SET_TRANSLATION,
    payload: {
      translation,
    },
  };
};
export const updateAll = ({
  text = '',
  transliteration = '',
  translation = '',
  sound = '',
  audioFile = '',
}) => {
  return {
    type: SET_TRANSLATION,
    payload: {
      text,
      transliteration,
      translation,
      sound,
      audioFile,
    },
  };
};

export const newTranslation = ({text, to, from}) => async (dispatch) => {
  try {
    const {data} = await translate({text, to, from});
    dispatch({
      type: SET_TRANSLATION_INFO,
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
    const {data} = await translate({text, to, from});
    dispatch({
      type: SET_TRANSLATION_INFO,
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

export const updateSound = (voice, translation) => async (
  dispach,
  getState,
) => {
  const oFilePath = getState()?.whatToSay?.audioFile ?? '';
  if (oFilePath.includes(translation)) {
    return;
  }
  const lang = voice.split('-').slice(0, 2).join('-');
  const {data} = await tts({
    text: translation,
    lang,
    voice,
  });
  let audioFile = `${RNFS.TemporaryDirectoryPath.replace(
    /\/\s*$/,
    '',
  )}/${removePunctuation(translation)}.wav`;
  if (data.startsWith('tts')) {
    const url = `https://d204jpj04e0c2r.cloudfront.net/${data}`;
    await RNFS.downloadFile({
      fromUrl: url,
      toFile: audioFile,
    });
  } else {
    const datab64 = data.replace('data:audio/wav;base64,', '');
    await RNFS.writeFile(audioFile, datab64, 'base64');
  }

  const sound = await loadAudio(audioFile);

  dispach({
    type: SET_SOUND,
    payload: {
      sound,
      audioFile,
    },
  });
};
