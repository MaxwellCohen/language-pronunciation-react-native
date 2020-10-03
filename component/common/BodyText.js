import React from 'react';
import {StyleSheet, Text} from 'react-native';

const BodyText = (props) => {
  console.log({...styles.body, ...props.style});
  return <Text style={{...styles.body, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    // fontFamily: 'open-sans',
    fontSize: 20
  },
});

export default BodyText;
