import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BodyText from '../common/BodyText';

const RecordingInfo = ({whatIsSaid}) => {
  return (
    <View>
      <BodyText>{whatIsSaid?.text}</BodyText>
      <BodyText style={styles.helperText}>
        {whatIsSaid?.textTransliteration}
      </BodyText>
      <BodyText style={styles.helperText}>{whatIsSaid?.translation} </BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  helperText: {
    fontSize: 10,
    color: '#646464',
  },
});

export default RecordingInfo;
