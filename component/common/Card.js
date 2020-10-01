import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = ({children, style}) => {
  return <View style={{...styles.inputContainer, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  inputContainer: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 6,
    backgroundColor: '#f7f7f7',
    elevation: 5,
    borderRadius: 5,
    padding: 20,
  },
});

export default Card;
