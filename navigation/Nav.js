import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import RecorderScreen from '../screens/RecorderScreen';
import {useDispatch} from 'react-redux';

import * as tokenActions from '../store/token/token.actions';
import * as permissionActions from '../store/permissions/permissions.actions';
const Drawer = createDrawerNavigator();

const Nav = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tokenActions.getToken());
    dispatch(permissionActions.checkPermission());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={RecorderScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Nav;
