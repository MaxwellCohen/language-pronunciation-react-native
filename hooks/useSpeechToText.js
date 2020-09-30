/*global SpeechSDK*/
import {useState, useEffect, useCallback} from 'react';
import speechApi from '../api/speech';
import {BinaryFile} from 'react-native-binary-file';
require('../polyfiles/fileReader');
require('../node_modules/microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle.js');

const to = 'zh-Han';
const from = 'en';
const voice = 'zh-CN-Kangkang-Apollo';

export default () => {
  const [token, setToken] = useState(
    'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiIwMzg2OWQ2MzI2ZGI0MzE1YjAxZjA4MDIwNGJlOGIzNSIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy81YjBjN2M1ZS1jMDZkLTQyODUtYmFiNy05OGJjZGM1NTIwZmMvcmVzb3VyY2VHcm91cHMvbGFuZ3VhZ2Vwcm9udW5jaWF0aW9uL3Byb3ZpZGVycy9NaWNyb3NvZnQuQ29nbml0aXZlU2VydmljZXMvYWNjb3VudHMvTWF4VGVzdFNwZWVjaEFQSSIsInNjb3BlIjoic3BlZWNoc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoc2VydmljZXMuZWFzdHVzIiwiZXhwIjoxNjAxNDc1MzMzLCJpc3MiOiJ1cm46bXMuY29nbml0aXZlc2VydmljZXMifQ.KTXFR6w_Pv2t3fb8BAgSwHbLUkyhFd98aeayjmZf1bo',
  );
  const [sstResult, setSstResult] = useState('');

  useEffect(() => {
    const requestToken = async () => {
      console.log('resquest token');
      try {
        const request = await speechApi.get('/token');
        setToken(request?.data?.token);
        console.log('token set to', request?.data?.token);
      } catch (e) {
        console.log('token error', e);
      }
    };

    if (!token) {
      requestToken();
    }
  }, [token]);

  const sstFromFile = useCallback(
    async (fileName) => {
      console.log(fileName);


      const fd = await BinaryFile.open(fileName);
      const buffer = await BinaryFile.read(fd, 512);
      console.log(buffer);

      // const result = await RNFS.readFile(fileName);
      // console.log(result.slice(0,200));
      // const audioConfig = SpeechSDK.AudioConfig.fromAudioFileOutput(fileName);



      // const audioConfig = SpeechSDK.AudioConfig.fromWavFileInput(
      //   new File([bl], 'test.wav', {type: 'audio/wav;base64'}),
      // );

      // const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(
      //   token,
      //   'eastus',
      // );
      // speechConfig.speechRecognitionLanguage = voice
      //   .split('-')
      //   .slice(0, 2)
      //   .join('-');
      // const reco = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
      // reco.recognized = (s, e) => {
      //   console.log(e);
      //   setSstResult(e?.result?.text);
      // };

      // reco.recognizeOnceAsync(
      //   () => {},
      //   (e) => {
      //     console.log(e);
      //   },
      // );
    },
    [setSstResult, token],
  );

  return [sstResult, sstFromFile];
};

// const sstFromFile = useCallback(
//   async (fileName) => {
//     if (fileName) {
//       const language = 'zh-CN';
//       const url = `wss://eastus.stt.speech.microsoft.com/speech/recognition/interactive/cognitiveservices/v1?language=${language}&format=simple&Authorization=${token}`;
//       console.log(url);
//       const ws = new WebSocket(url, 'binary');

//       ws.onmessage = (event) => {
//         console.log('onmessage', event);
//         ws.close();
//       };
//       ws.onerror = (error) => {
//         console.log('onerror', error);
//       };
//       ws.onclose = () => console.log('onclose');
//       const uploadUri =
//         Platform.OS === 'ios' ? fileName.replace('file://', '') : fileName;
//       try {
//         let result = await fs.readFile(uploadUri, 'bianary');
//         console.log(result);
//         let bl = await Blob.build(result, {type: 'audio/wave'});
//         ws.send(bl);
//         console.log(result);
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   },
//   [token],
// );
