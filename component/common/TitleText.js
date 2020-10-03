import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const TitleText = (props) => {
  return <Text style={{...styles.body, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    // fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginVertical: 10,
  },
});

export default TitleText;
