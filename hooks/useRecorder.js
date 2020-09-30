import {useState, useEffect} from 'react';
import Permissions from 'react-native-permissions';
import AudioRecord from 'react-native-audio-record';
import Sound from 'react-native-sound';

const checkPermission = async () => {
  const p = await Permissions.check(
    Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
  );
  console.log('permission check', p);
  if (p === 'authorized') {
    return;
  }
  return requestPermission();
};

const requestPermission = async () => {
  const p = await Permissions.request(
    Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
  );
  console.log('permission request', p);
};

const setup = async () => {
  await checkPermission();

  console.log('hi');
  const options = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    wavFile: 'test.wav',
  };

  AudioRecord.init(options);

  AudioRecord.on('data', (data) => {
    // base64-encoded audio data chunks
    // console.log(data)
  });
};

let sound = null;
export default () => {
  const [audioFile, setAudioFile] = useState('');
  const [recording, setRecording] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(true);

  const start = () => {
    console.log('start record');
    setAudioFile('');
    setRecording(true);
    setLoaded(false);
    AudioRecord.start();
  };

  const stop = async () => {
    if (!recording) {
      return;
    }
    console.log('stop record');
    let a = await AudioRecord.stop();
    console.log('audioFile', a);
    setAudioFile(a);
    setRecording(false);
  };

  const load = () => {
    return new Promise((resolve, reject) => {
      if (!audioFile) {
        return reject('file path is empty');
      }

      sound = new Sound(audioFile, '', (error) => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        setLoaded(true);
        return resolve();
      });
    });
  };

  const play = async () => {
    if (!loaded) {
      try {
        await load();
      } catch (error) {
        console.log(error);
      }
    }

    setPaused(false);

    Sound.setCategory('Playback');

    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      setPaused(true);
    });
  };

  const pause = () => {
    sound.pause();
    setPaused(true);
  };

  useEffect(() => {
    setup();
  }, []);

  return [start, stop, play, pause, paused, audioFile, recording];
};
