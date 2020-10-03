import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Colors from '../../constants/colors';
const MainButton = (props) => {
  let ButtonComponet = TouchableOpacity;
  if (Platform.Version >= 21) {
    ButtonComponet = TouchableNativeFeedback;
  }

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
    overflow: 'hidden',
    borderRadius: 50,
  },
  button: {
    backgroundColor: Colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    // fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MainButton;
