import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import Colors from '../../constants/colors';
import TitleText from './TitleText';

const Header = ({title}) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.HeaderIOS,
          android: styles.HeaderAndroid,
        }),
      }}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  HeaderAndroid: {
    backgroundColor: Colors.blue,
  },
  headerTitle: {
    color: Platform.OS === 'android' ? 'white' : Colors.blue,
    fontSize: 18,
  },
});

export default Header;
