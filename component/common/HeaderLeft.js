import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from './HeaderButton';

const HeaderLeft = ({navData}) => (
  <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="Menu"
      iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
      onPress={() => {
        navData.navigation.toggleDrawer();
      }}
    />
  </HeaderButtons>
);
const styles = StyleSheet.create({});

export default HeaderLeft;
