/*global SpeechSDK*/
import AudioRecord from 'react-native-audio-record';
import {BinaryFile} from 'react-native-binary-file';
var RNFS = require('react-native-fs');
import {stat} from 'react-native-fs';
import Sound from 'react-native-sound';
require('../../polyfiles/fileReader');
require('../../node_modules/microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js');

export const CLEAR_RECORDINGS = 'CLEAR_RECORDINGS';
export const START_RECORDING = 'START_RECORDING';
export const STOP_RECORDING = 'STOP_RECORDING';
export const PLAY_RECORDING = 'PLAY_RECORDING';
export const START_STT = 'START_STT';
export const END_STT = 'END_STT';
export const ADD_SOUND = 'ADD_SOUND';
export const DELETE_RECORDING = 'DELETE_RECORDING';

const model = {
  id: '',
  recording: false,
  audioFile: '',
  loaded: '',
  processing: false,
  sound: null,
};

export const deleteRecording = ({id, audioFile}) => async (dispach) => {
  try {
    const exist = await RNFS.exists(audioFile);
    if (exist) {
      await RNFS.unlink(audioFile);
    }
  } catch (e) {
    console.error(e);
  }
  dispach({
    type: DELETE_RECORDING,
    payload: {
      id,
    },
  });
};

export const clearRecording = () => {
  return {
    type: CLEAR_RECORDINGS,
  };
};

export const startRecording = () => {
  console.log('start recording');
  const wavFile = `${new Date().toISOString().replace(/[^\w\s]/gi, '')}.wav`;
  const options = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    wavFile,
  };

  AudioRecord.init(options);
  AudioRecord.start();

  return {
    type: START_RECORDING,
    payload: {
      id: wavFile,
    },
  };
};

export const stopRecording = () => async (dispatch, getState) => {
  const token = getState().token.token;
  const {id, recording} = latestRecording(getState);

  if (!recording) {
    return;
  }
  console.log('stop record');
  let audioFile = await AudioRecord.stop();
  console.log('audioFile', audioFile);
  dispatch({
    type: STOP_RECORDING,
    payload: {
      audioFile,
      id,
    },
  });

  try {
    await sst(audioFile, token, dispatch);
  } catch (e) {
    console.error(e);
  }

  try {
    const sound = await loadAudio(audioFile);
    dispatch({
      type: ADD_SOUND,
      payload: {
        audioFile,
        sound,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const startStt = (audioFile) => {
  return {
    type: START_STT,
    payload: {audioFile},
  };
};
export const endStt = (audioFile, whatIsSaid) => {
  return {
    type: END_STT,
    payload: {audioFile, whatIsSaid},
  };
};

const latestRecording = (getState) => {
  const {recordings} = getState();
  return recordings.recordings[recordings.recordings.length - 1] || {};
};

const sst = async (fileName, token, dispatch) => {
  const voice = 'en-US-Kangkang-Apollo';
  if (fileName && token) {
    dispatch(startStt(fileName));
    try {
      const audioConfig = await createConfig(fileName);
      const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(
        token,
        'eastus',
      );
      speechConfig.speechRecognitionLanguage = voice
        .split('-')
        .slice(0, 2)
        .join('-');
      const reco = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
      reco.recognized = (s, e) => {
        const text = e?.result?.text;
        dispatch(endStt(fileName, text));
        reco.close();
      };

      reco.recognizeOnceAsync(
        () => {},
        (e) => {
          dispatch(endStt(fileName, ''));
          console.error(e);
        },
      );
    } catch (e) {
      dispatch(endStt(fileName, ''));
    }
  }
};

const createConfig = async (fileName) => {
  const fstat = await stat(fileName);
  const fd = await BinaryFile.open(fileName);
  const blob = await BinaryFile.read(fd, fstat.size - 1);
  const pushStream = SpeechSDK.AudioInputStream.createPushStream();
  pushStream.write(blob.buffer);
  pushStream.close();
  const audioConfig = SpeechSDK.AudioConfig.fromStreamInput(pushStream);
  return audioConfig;
};

const loadAudio = (audioFile) => {
  return new Promise((resolve, reject) => {
    if (!audioFile) {
      return reject('file path is empty');
    }
    console.log(audioFile);
    const sound = new Sound(audioFile, '', (error) => {
      if (error) {
        console.log('failed to load the file', error);
        return reject(error);
      }
      return resolve(sound);
    });
  });
};
