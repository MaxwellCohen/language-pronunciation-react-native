import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import Card from './common/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayButton from './common/PlayButton';
import Colors from '../constants/colors';
import BodyText from './common/BodyText';

const RecordingListItem = ({item, correct, playSound}) => {
  return (
    <Card>
      <View style={styles.row}>
        <View style={styles.text}>
          {item?.processing ? (
            <ActivityIndicator size="small" color={Colors.blue} />
          ) : (
            <View style={styles.rowStart}>
              <View>
                {correct ? (
                  <Icon
                    name="checkmark-circle"
                    size={24}
                    color={Colors.green}
                  />
                ) : null}
              </View>
              <View>
                <BodyText>{item?.whatIsSaid?.text}</BodyText>
                <BodyText style={styles.helperText}>
                  {item?.whatIsSaid?.textTransliteration}-
                  {item?.whatIsSaid?.translation}
                </BodyText>
              </View>
            </View>
          )}
        </View>
        <View style={[styles.playbackButton]}>
          <PlayButton onPress={playSound} sound={item?.sound} />
        </View>
      </View>
    </Card>
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
  helperText: {
    fontSize: 10,
  },
  playbackButton: {},
  rowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 1,
  },
});

export default RecordingListItem;
