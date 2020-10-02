import axios from 'axios';

export const baseURL =
  'https://cmca67rw14.execute-api.us-east-1.amazonaws.com/dev';

const speechAPI = axios.create({
  baseURL: baseURL,
});

export const translate = ({text, to, from}) => {
  return speechAPI.get('/translate', {
    params: {text, to, from},
  });
};

export const tts = ({text, lang, voice}) => {
  return speechAPI.get('/tts', {
    params: {
      text,
      lang,
      voice,
    },
    headers: {Accept: 'text/plain'},
  });
};

export default speechAPI;
