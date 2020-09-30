import React, {useEffect} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import useRecorder from './hooks/useRecorder';
import useSpeechToText from './hooks/useSpeechToText';

const App = () => {
  const [
    start,
    stop,
    play,
    pause,
    paused,
    audioFile,
    recording,
  ] = useRecorder();

  const [sstResult, sstFromFile] = useSpeechToText();

  useEffect(() => {
    if (audioFile) {
      console.log('start sst');
      sstFromFile(audioFile);
    }
  }, [audioFile, sstFromFile]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button onPress={start} title="Record" disabled={recording} />
        <Button onPress={stop} title="Stop" disabled={!recording} />
        {paused ? (
          <Button onPress={play} title="Play" disabled={!audioFile} />
        ) : (
          <Button onPress={pause} title="Pause" disabled={!audioFile} />
        )}
      </View>
      <Text>{sstResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default App;
