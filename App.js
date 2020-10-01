import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import * as Font from 'expo-font';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider as ReduxProvider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import token from './store/token/token.reducer';
import permission from './store/permissions/permissions.reducer';
import recordings from './store/recordings/recording.reducer';
import language from './store/language/language.reducer';
import whatToSay from './store/whatToSay/whatToSay.reducer';
import Nav from './navigation/Nav';

const rootReducer = combineReducers({
  token: token,
  permission: permission,
  recordings: recordings,
  language: language,
  whatToSay: whatToSay,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = async () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchFonts()
      .then(() => {
        setDataLoaded(true);
      })
      .catch(() => {
        setDataLoaded(true);
      });
  }, []);

  if (!dataLoaded) {
    console.log('waiting to load data ');
    return (
      <View>
        <Text> loading data</Text>
      </View>
    );
  }

  return (
    <ReduxProvider store={store}>
      <Nav />
    </ReduxProvider>
  );
};

// const styles = StyleSheet.create({});

export default App;
