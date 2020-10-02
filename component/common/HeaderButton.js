import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/colors';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Icon}
      iconSize={24}
      color={Platform.OS === 'android' ? 'black' : Colors.blue}
    />
  );
};

export default CustomHeaderButton;
