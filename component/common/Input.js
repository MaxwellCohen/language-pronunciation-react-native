import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = (props) => {
  return <TextInput {...props} style={{...styles.input, ...props.style}} />;
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 0,
    padding: 0,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Input;
