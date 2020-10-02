import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import BodyText from '../common/BodyText';
import * as recordingActions from '../../store/recordings/recordings.actions';
import {useDispatch} from 'react-redux';
import Colors from '../../constants/colors';
import RecordingInfo from './RecordingInfo';

const RecordingListItemHidden = ({rowMap, item}) => {
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
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, item.id)}>
        <BodyText style={styles.backTextWhite}>Close</BodyText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          deleteRecording(item);
        }}>
        <BodyText style={styles.backTextWhite}>Delete</BodyText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    alignSelf: 'center',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    overflow: 'hidden',
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    bottom: 0,
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

export default RecordingListItemHidden;
