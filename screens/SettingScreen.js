import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import BodyText from '../component/common/BodyText';
import Card from '../component/common/Card';
import {languageSuportData} from '../api/speech';
import {useDispatch, useSelector} from 'react-redux';
import * as languageActions from '../store/language/language.actions';
import TextOrPicker from '../component/common/TextOrPicker';
import HeaderLeft from '../component/common/HeaderLeft';

const SettingScreen = () => {
  const [learningOptions, setLearningOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [voiceOptions, setVoiceOptions] = useState([]);
  const {userLanguage, learningLanguage, voice} = useSelector(
    (state) => state.language,
  );
  const dispatch = useDispatch();

  const setLearningLanguage = (itemValue, itemIndex) => {
    if (itemValue !== learningLanguage) {
      dispatch(languageActions.setLearningLanguage(itemValue));
    }
    setVoiceOptions(learningOptions[itemIndex].voices || []);
  };
  const setVoice = (itemValue) => {
    if (itemValue !== voice) {
      dispatch(languageActions.setVoice(itemValue));
    }
  };
  const setUserLanguage = (itemValue) => {
    if (itemValue !== userLanguage) {
      dispatch(languageActions.setUserLanguage(itemValue));
    }
  };

  useEffect(() => {
    const getOptions = async () => {
      try {
        const {data} = await languageSuportData();
        setLearningOptions([...data]);
        setLanguageOptions([...data]);
      } catch (e) {
        console.error(e);
      }
    };
    if (learningOptions.length === 0) {
      getOptions();
    }
  }, [learningOptions]);

  return (
    <View style={styles.container}>
      <Card>
        <BodyText>I would like to learn to speak </BodyText>
        <TextOrPicker
          value={learningLanguage}
          onValueChange={setLearningLanguage}
          options={learningOptions}
        />
        <BodyText>using </BodyText>
        <TextOrPicker
          value={voice}
          onValueChange={setVoice}
          options={voiceOptions}
        />
        <BodyText>I know </BodyText>
        <TextOrPicker
          value={userLanguage}
          onValueChange={setUserLanguage}
          options={languageOptions}
        />
      </Card>
    </View>
  );
};

export const navigationOptions = (navData) => {
  return {
    headerTitle: 'Settings',
    headerLeft: () => <HeaderLeft navData={navData} />,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});

export default SettingScreen;
