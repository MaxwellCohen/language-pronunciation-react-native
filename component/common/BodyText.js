import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const BodyText = (props) => {
  return <Text style={{...styles.body, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans'
  }
});

export default BodyText;
