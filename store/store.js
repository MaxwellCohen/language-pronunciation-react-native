import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import token from './token/token.reducer';
import permission from './permissions/permissions.reducer';
import recordings from './recordings/recording.reducer';
import language from './language/language.reducer';
import whatToSay from './whatToSay/whatToSay.reducer';

const languageConfig = {
  key: 'language',
  storage: AsyncStorage,
};
const whatToSayConfig = {
  key: 'whatToSay',
  storage: AsyncStorage,
  whitelist: ['text', 'transliteration', 'translation'],
};

const rootReducer = combineReducers({
  token: token,
  permission: permission,
  recordings: recordings,
  language: persistReducer(languageConfig, language),
  whatToSay: persistReducer(whatToSayConfig, whatToSay),
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

export {persistor, store};
