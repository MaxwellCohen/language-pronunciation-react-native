import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlayButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="play" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default PlayButton;
