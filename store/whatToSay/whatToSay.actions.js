import {translate, tts} from '../../api/speech';
import RNFS from 'react-native-fs';
import {loadAudio} from '../../util/sound';
import {removePunctuation} from '../../util/removePunctuation';
import {encode} from 'js-base64'

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
  if (oFilePath.includes(removePunctuation(translation))) {
    return;
  }
  const lang = voice.split('-').slice(0, 2).join('-');
  try {
    let {data} = await tts({
      text: translation,
      lang,
      voice,
    });

    let audioFile = `${RNFS.DocumentDirectoryPath}/${encode(translation)}.wav`;

    if (data.startsWith('tts')) {
      const url = `https://d204jpj04e0c2r.cloudfront.net/${data}`;
      const request = await fetch(url);
      if (!request.ok) {
        return;
      }
      const blob = await request.blob();
      data = await blobToBase64(blob);
    }

    const datab64 = data.split(',')[1];
    await RNFS.writeFile(audioFile, datab64, 'base64');
    const sound = await loadAudio(audioFile);

    dispach({
      type: SET_SOUND,
      payload: {
        sound,
        audioFile,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const blobToBase64 = (blob) => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.error;
  });
};
