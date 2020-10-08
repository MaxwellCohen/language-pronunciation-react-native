import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import RecorderScreen, {
  navigationOptions as RecorderScreenOptions,
} from '../screens/RecorderScreen';
import SettingScreen, {
  navigationOptions as SettingScreenOptions,
} from '../screens/SettingScreen';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import * as tokenActions from '../store/token/token.actions';
import * as permissionActions from '../store/permissions/permissions.actions';

const RecordingStack = createStackNavigator();
const RecorderScreenStackNav = () => {
  return (
    <RecordingStack.Navigator>
      <RecordingStack.Screen
        name="RecordingScreen"
        component={RecorderScreen}
        options={RecorderScreenOptions}
      />
    </RecordingStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();
const SettingsScreenStackNav = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingScreen}
        options={SettingScreenOptions}
      />
    </SettingsStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const Nav = () => {
  const dispatch = useDispatch();
  const {voice, userLanguage} = useSelector((state) => state.language);
  const {token} = useSelector((state) => state.token);
  useEffect(() => {
    dispatch(tokenActions.getToken());
    dispatch(permissionActions.checkPermission());
  }, [dispatch]);

  console.log('token', token);
  if (!token) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>loading...</Text>
      </View>
    );
  }

  const setIntialRoute = () => {
    console.log(voice && userLanguage);
    if (voice && userLanguage) {
      return 'Pronunciation Tool';
    }
    return 'Settings';
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={setIntialRoute()}>
        {voice && userLanguage ? (
          <Drawer.Screen
            name="Pronunciation Tool"
            component={RecorderScreenStackNav}
          />
        ) : null}
        <Drawer.Screen name="Settings" component={SettingsScreenStackNav} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignContent: 'center', justifyContent: 'center'},
  text: {textAlign: 'center'},
});

export default Nav;
