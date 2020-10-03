import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import Card from '../common/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayButton from '../common/PlayButton';
import Colors from '../../constants/colors';
import RecordingInfo from './RecordingInfo';

const RecordingListItem = ({item, correct, playSound, sstSound}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View style={styles.text}>
          {item?.processing ? (
            <ActivityIndicator size="small" color={Colors.blue} />
          ) : (
            <View style={styles.rowStart}>
              <View style={styles.icon}>
                {correct ? (
                  <Icon
                    name="checkmark-circle"
                    size={24}
                    color={Colors.green}
                  />
                ) : null}
              </View>
              <RecordingInfo whatIsSaid={item?.whatIsSaid} />
            </View>
          )}
        </View>
        <View style={[styles.playbackButton]}>
          <PlayButton sound={item?.sound} sounds={[sstSound, item?.sound]} />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 1,
  },
  text: {
    flex: 1,
    alignSelf: 'center',
  },
  playbackButton: {},
  rowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 1,
  },
  icon: {
    marginLeft: -5,
    marginRight: 10,
  },
});

export default RecordingListItem;
