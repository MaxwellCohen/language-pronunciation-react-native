import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';

const PlayButton = ({onPress, sound, blank}) => {
  if (blank) {
    return <View />;
  }
  return (
    <View>
      {sound ? (
        <TouchableOpacity onPress={onPress}>
          <Icon name="play" size={24} />
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="small" color={colors.blue} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlayButton;
