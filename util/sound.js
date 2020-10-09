import Sound from 'react-native-sound';

export const loadAudio = (audioFile) => {
  return new Promise((resolve, reject) => {
    if (!audioFile) {
      return reject('file path is empty');
    }
    const sound = new Sound(audioFile, '', (error) => {
      if (error) {
        console.error('failed to load the file', error);
        return reject(error);
      }
      return resolve(sound);
    });
  });
};

export const promisifyPlaySound = (sound) => {
  return new Promise((resolve, reject) => {
    if (!sound) {
      return resolve(false);
    }
    sound.play((success) => {
      return resolve(success);
    });
  });
};
