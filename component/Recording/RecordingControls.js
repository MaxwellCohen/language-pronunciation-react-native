import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import MainButton from './common/MainButton';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from '../../store/recordings/recordings.actions';
import Colors from '../../constants/colors';

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
      {!lastRecording.recording ? (
        <MainButton onPress={start}>Record!</MainButton>
      ) : (
        <MainButton onPress={stop} color={Colors.red}>
          Stop
        </MainButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default RecordingControls;
