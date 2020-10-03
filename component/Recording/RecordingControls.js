import React, {useCallback} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import MainButton from '../common/MainButton';
import BodyText from '../common/BodyText';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from '../../store/recordings/recordings.actions';
import Colors from '../../constants/colors';
import Card from '../common/Card';
import Icon from 'react-native-vector-icons/Ionicons';
const RecordingControls = () => {
  const lastRecording = useSelector((state) => {
    return (
      state.recordings.recordings[state.recordings.recordings.length - 1] || {}
    );
  });

  const dispatch = useDispatch();

  const start = useCallback(() => {
    dispatch(Actions.startRecording());
  }, [dispatch]);

  const stop = useCallback(() => {
    dispatch(Actions.stopRecording());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <MainButton
        onPressIn={start}
        onPressOut={stop}
        color={lastRecording.recording ? Colors.red : Colors.blue}>
        {!lastRecording.recording ? 'Record!' : 'Stop'}
      </MainButton>
      <View style={styles.centeredView}>
        <Modal
          style={styles.modalContainer}
          visible={!!lastRecording.recording}
          animationType="fade"
          onRequestClose={() => {}}
          transparent={true}>
          <View style={styles.centeredView}>
            <Card style={styles.alignCenter}>
              <Icon name="mic-outline" size={100} />
              <BodyText>Recording!</BodyText>
            </Card>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  recordingView: {
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecordingControls;
