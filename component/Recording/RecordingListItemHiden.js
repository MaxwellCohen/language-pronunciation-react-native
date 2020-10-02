import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import BodyText from './common/BodyText';
import * as recordingActions from '../store/recordings/recordings.actions';
import {useDispatch} from 'react-redux';
import Colors from '../constants/colors';

const RecordingListItemHiden = ({rowMap, data}) => {
  const dispatch = useDispatch();

  const deleteRecording = (recording) => {
    dispatch(recordingActions.deleteRecording(recording));
  };

  const closeRow = (_rowMap, rowKey) => {
    if (_rowMap[rowKey]) {
      _rowMap[rowKey].closeRow();
    }
  };

  return (
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
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: 1,
  },
  text: {
    flex: 1,
    alignSelf: 'center',
  },
  backTextWhite: {
    color: '#FFF',
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

export default RecordingListItemHiden;
