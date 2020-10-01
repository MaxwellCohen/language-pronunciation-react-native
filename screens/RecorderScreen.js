import React from 'react';
import {StyleSheet, View} from 'react-native';
import Card from '../component/common/Card';
import RecordingControls from '../component/RecordingControls';
import RecordingList from '../component/RecordingList';

const RecorderScreen = () => {
  return (
    <View style={styles.container}>
      <RecordingList />
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
});

export default RecorderScreen;
