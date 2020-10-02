import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import BodyText from './BodyText';

const TextOrPicker = ({value, options, onValueChange}) => {
  return (
    <View>
      {!options?.length ? (
        <BodyText>{value}</BodyText>
      ) : (
        <Picker
          selectedValue={value}
          style={{height: 50, width: '100%'}}
          onValueChange={onValueChange}>
          {options.map((item) => (
            <Picker.Item label={item.name} value={item.code} />
          ))}
        </Picker>
      )}
    </View>
  );
};
const styles = StyleSheet.create({});

export default TextOrPicker;
