import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import RecorderScreen, {
  navigationOptions as RecorderScreenOptions,
} from '../screens/RecorderScreen';
import SettingScreen, {
  navigationOptions as SettingScreenOptions,
} from '../screens/SettingScreen';
import {useDispatch} from 'react-redux';

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

  useEffect(() => {
    dispatch(tokenActions.getToken());
    dispatch(permissionActions.checkPermission());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Settings">
        <Drawer.Screen
          name="Pronunciation Tool"
          component={RecorderScreenStackNav}
        />
        <Drawer.Screen name="Settings" component={SettingsScreenStackNav} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Nav;
