import React from 'react';
import {StyleSheet, View} from 'react-native';
import Card from '../component/common/Card';
import Header from '../component/common/Header';
import RecordingControls from '../component/RecordingControls';
import RecordingList from '../component/RecordingList';
import RecordingPrompt from '../component/RecordingPrompt';

const RecorderScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="LPT" />
      <View style={styles.body}>
        <RecordingPrompt />
        <RecordingList />
      </View>
      <Card>
        <RecordingControls style={styles.fill} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fill: {
    width: '100%',
  },
  body: {
    paddingHorizontal: 5,
    flex: 1,
  },
});

export default RecorderScreen;
