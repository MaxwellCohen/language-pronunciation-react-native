import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BodyText from './common/BodyText';
import Input from './common/Input';
import Card from './common/Card';
import {useSelector, useDispatch} from 'react-redux';
import * as whatToSayActions from '../store/whatToSay/whatToSay.actions';
import PlayButton from './common/PlayButton';

const RecordingPrompt = () => {
  const {text, transliteration, translation} = useSelector(
    (state) => state.whatToSay,
  );
  const {userLanguage, learningLanguage} = useSelector(
    (state) => state.language,
  );

  const dispatch = useDispatch();
  const newTranslation = () => {
    dispatch(
      whatToSayActions.newTranslation({
        text: translation,
        to: userLanguage,
        from: learningLanguage,
      }),
    );
  };
  const newText = () => {
    dispatch(
      whatToSayActions.newText({
        text: text,
        to: learningLanguage,
        from: userLanguage,
      }),
    );
  };

  return (
    <View>
      <Card>
        <View style={styles.row}>
          <BodyText>I would like to say</BodyText>
          <PlayButton onPress={() => {}} />
        </View>
        <Input
          value={text}
          onChangeText={(t) => dispatch(whatToSayActions.updateText(t))}
          onBlur={newText}
        />
        <BodyText>Please say</BodyText>
        <Input
          value={translation}
          onChangeText={(t) => dispatch(whatToSayActions.updateTranslation(t))}
          onBlur={newTranslation}
        />
        <BodyText style={styles.helperText}>{transliteration}</BodyText>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  helperText: {
    fontSize: 12,
    // marginTop: -10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RecordingPrompt;
