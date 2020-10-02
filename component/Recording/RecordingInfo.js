import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BodyText from '../common/BodyText';

const RecordingInfo = ({whatIsSaid}) => {
  return (
    <View>
      <BodyText>{whatIsSaid?.text}</BodyText>
      <BodyText style={styles.helperText}>
        {whatIsSaid?.textTransliteration}-{whatIsSaid?.translation}
      </BodyText>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RecordingInfo;
