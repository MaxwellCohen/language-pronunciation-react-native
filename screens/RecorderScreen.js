import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import Card from '../component/common/Card';
import RecordingControls from '../component/Recording/RecordingControls';
import RecordingList from '../component/Recording/RecordingList';
import RecordingPrompt from '../component/Recording/RecordingPrompt';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../component/common/HeaderButton';

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
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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
