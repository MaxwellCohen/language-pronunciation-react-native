import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import {promisifyPlaySound} from '../../util/sound';

const PlayButton = ({loading, hide, sounds}) => {
  const soundRef = useRef();
  const stopedRef = useRef();
  const [playing, setPlaying] = useState(false);
  if (hide) {
    return <View />;
  }

  if (loading) {
    return <ActivityIndicator size="small" color={colors.blue} />;
  }

  const playSounds = (index = 0) => {
    if (index < sounds.length && !stopedRef.current) {
      setPlaying(true);
      const sound = sounds[index];
      soundRef.current = sound;
      promisifyPlaySound(sound).then(() => playSounds(index + 1));
    } else {
      setPlaying(false);
    }
  };

  const startPlayingSounds = () => {
    stopedRef.current = false;
    playSounds();
  };

  const stopPlaying = async () => {
    setPlaying(false);
    stopedRef.current = true;
    if (soundRef.current) {
      soundRef.current.stop();
    }
  };

  return (
    <View>
      {!playing ? (
        <TouchableOpacity onPress={() => startPlayingSounds()}>
          <Icon name="play" size={20} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => stopPlaying()}>
          <Icon name="stop" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

PlayButton.defaultProps = {
  sounds: [],
  loading: false,
  hide: false,
};

const styles = StyleSheet.create({});

export default PlayButton;
