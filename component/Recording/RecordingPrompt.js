import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import BodyText from '../common/BodyText';
import Input from '../common/Input';
import Card from '../common/Card';

import {useSelector, useDispatch} from 'react-redux';
import * as whatToSayActions from '../../store/whatToSay/whatToSay.actions';
import PlayButton from '../common/PlayButton';

const RecordingPrompt = () => {
  const {text, transliteration, translation, sound} = useSelector(
    (state) => state.whatToSay,
  );

  const {userLanguage, learningLanguage, voice} = useSelector(
    (state) => state.language,
  );

  useEffect(() => {
    if (text && translation) {
      dispatch(whatToSayActions.updateSound(voice, translation));
    }
  }, [text, translation, voice, dispatch]);

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
          <BodyText>I would like to say: </BodyText>
          <PlayButton
            sounds={[sound]}
            loading={!sound}
            hide={!(translation && text)}
          />
        </View>
        <Input
          value={text}
          onChangeText={(t) => dispatch(whatToSayActions.setText(t))}
          onBlur={newText}
        />
        <BodyText>Please say: </BodyText>
        <Input
          value={translation}
          onChangeText={(t) => dispatch(whatToSayActions.setTranslation(t))}
          onBlur={newTranslation}
        />
        <BodyText style={styles.helperText}>{transliteration}</BodyText>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  helperText: {
    fontSize: 10,
    color: '#646464',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RecordingPrompt;
