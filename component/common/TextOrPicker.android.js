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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={value}
            style={styles.picker}
            onValueChange={onValueChange}>
            {options.map((item) => (
              <Picker.Item
                label={item.name}
                value={item.code}
                key={item.code}
              />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    paddingHorizontal: 0,
  },
  pickerContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});

export default TextOrPicker;
