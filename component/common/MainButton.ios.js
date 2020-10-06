import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
const MainButton = (props) => {
  let ButtonComponet = TouchableOpacity;
  const noop = () => {};
  return (
    <View style={styles.buttonContainer}>
      <ButtonComponet
        onPress={props.onPress || noop}
        onPressIn={props.onPressIn || noop}
        onPressOut={props.onPressOut || noop}
        disabled={props.disabled}>
        <View
          style={{
            ...styles.button,
            ...{backgroundColor: props.color || Colors.blue},
          }}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponet>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // overflow: 'hidden',
    borderRadius: 25,
    width: '95%',
  },
  button: {
    backgroundColor: Colors.blue,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    // fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MainButton;
