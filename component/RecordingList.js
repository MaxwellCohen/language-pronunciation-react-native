import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';
import Card from './common/Card';
import BodyText from './common/BodyText';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {SwipeListView} from 'react-native-swipe-list-view';
import Colors from '../constants/colors';
import * as recordingActions from '../store/recordings/recordings.actions';

const RecordingList = () => {
  const recordings = useSelector((state) => state.recordings.recordings);
  const dispatch = useDispatch();

  const playSound = ({sound}) => {
    if (!sound) {
      return null;
    }
    Sound.setCategory('Playback');
    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRecording = (recording) => {
    dispatch(recordingActions.deleteRecording(recording));
  };

  const renderHidenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <BodyText>Left</BodyText>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.id)}>
        <BodyText style={styles.backTextWhite}>Close</BodyText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          deleteRecording(data.item);
        }}>
        <BodyText style={styles.backTextWhite}>Delete</BodyText>
      </TouchableOpacity>
    </View>
  );
  const renderItems = ({item}) => {
    return (
      <Card>
        <View style={styles.row}>
          <View style={styles.text}>
            {item.processing ? (
              <BodyText>tying to figure out what you said: </BodyText>
            ) : (
              <BodyText>{item.whatIsSaid}</BodyText>
            )}
          </View>
          <View style={[styles.playbackButton]}>
            <TouchableOpacity onPress={() => playSound(item)}>
              <Icon name="play" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SwipeListView
      data={recordings.filter((item) => item.audioFile)}
      keyExtractor={(item) => item.id}
      renderItem={renderItems}
      renderHiddenItem={renderHidenItem}
      leftOpenValue={75}
      rightOpenValue={-150}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: 1,
    // width: '100%',
  },
  playbackButton: {},
  text: {
    flex: 1,
    alignSelf: 'center',
  },

  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: Colors.blue,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: Colors.red,
    right: 0,
  },
});

export default RecordingList;
