import * as Actions from './recordings.actions';
import * as languageActions from '../language/language.actions';

const initial_state = {
  recordings: [],
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case Actions.START_RECORDING:
      return startRecording(state, action);
    case Actions.STOP_RECORDING:
      return stopRecording(state, action);
    case Actions.START_STT:
      return startStt(state, action);
    case Actions.END_STT:
      return endStt(state, action);
    case Actions.ADD_SOUND:
      return addSound(state, action);
    case Actions.DELETE_RECORDING:
      return deleteRecording(state, action);
    case languageActions.SET_USER_LANGUAGE:
      return initial_state;
    case languageActions.SET_LEARNING_LANGUAGE:
      return initial_state;
    default:
      return state;
  }
};

const startRecording = (state, action) => {
  return {
    ...state,
    recordings: [
      ...state.recordings,
      {
        recording: true,
        id: action.payload.id,
        audioFile: '',
        loaded: '',
        sound: null,
      },
    ],
  };
};
const stopRecording = (state, action) => {
  const lastestItem = state.recordings.find(({id}) => id === action.payload.id);
  return {
    ...state,
    recordings: [
      ...state.recordings.filter(({id}) => id !== action.payload.id),
      {
        ...lastestItem,
        recording: false,
        audioFile: action.payload.audioFile,
      },
    ],
  };
};
const startStt = (state, action) => {
  const lastestItem = state.recordings.find(
    ({audioFile}) => audioFile === action.payload.audioFile,
  );
  return {
    ...state,
    recordings: [
      ...state.recordings.filter(
        ({audioFile}) => audioFile !== action.payload.audioFile,
      ),
      {
        ...lastestItem,
        processing: true,
        whatIsSaid: '',
      },
    ],
  };
};
const endStt = (state, action) => {
  const lastestItem = state.recordings.find(
    ({audioFile}) => audioFile === action.payload.audioFile,
  );
  return {
    ...state,
    recordings: [
      ...state.recordings.filter(
        ({audioFile}) => audioFile !== action.payload.audioFile,
      ),
      {
        ...lastestItem,
        processing: false,
        whatIsSaid: action.payload.whatIsSaid,
      },
    ],
  };
};
const addSound = (state, action) => {
  const lastestItem = state.recordings.find(
    ({audioFile}) => audioFile === action.payload.audioFile,
  );
  return {
    ...state,
    recordings: [
      ...state.recordings.filter(
        ({audioFile}) => audioFile !== action.payload.audioFile,
      ),
      {
        ...lastestItem,
        sound: action.payload.sound,
      },
    ],
  };
};

const deleteRecording = (state, action) => {
  return {
    ...state,
    recordings: state.recordings.filter(({id}) => id !== action.payload.id),
  };
};
