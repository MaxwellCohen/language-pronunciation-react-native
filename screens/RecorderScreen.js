import React from 'react';
import {StyleSheet, View} from 'react-native';
import Card from '../component/common/Card';
import RecordingControls from '../component/Recording/RecordingControls';
import RecordingList from '../component/Recording/RecordingList';
import RecordingPrompt from '../component/Recording/RecordingPrompt';
import HeaderLeft from '../component/common/HeaderLeft';

const RecorderScreen = () => {
  return (
    <View style={styles.container}>
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

export const navigationOptions = (navData) => {
  return {
    headerTitle: 'Pronunciation Tool',
    headerLeft: () => <HeaderLeft navData={navData} />,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
