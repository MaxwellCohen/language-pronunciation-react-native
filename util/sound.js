import Sound from 'react-native-sound';

export const loadAudio = (audioFile) => {
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
