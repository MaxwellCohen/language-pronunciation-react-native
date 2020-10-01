import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';
const MainButton = (props) => {
  let ButtonComponet = TouchableOpacity;

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponet onPress={props.onPress} disabled={props.disabled}>
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
    borderWidth: 5,
    borderColor: 'black',
  },
  button: {
    backgroundColor: Colors.blue,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MainButton;
