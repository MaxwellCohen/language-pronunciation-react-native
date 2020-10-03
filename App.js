import 'react-native-gesture-handler';
import React from 'react';
import {store} from './store/store';
import {Provider as ReduxProvider} from 'react-redux';
import Nav from './navigation/Nav';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Nav />
    </ReduxProvider>
  );
};

// const styles = StyleSheet.create({});

export default App;
