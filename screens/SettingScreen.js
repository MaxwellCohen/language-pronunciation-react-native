import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../component/common/HeaderButton';
import BodyText from '../component/common/BodyText';
import Card from '../component/common/Card';
import {Picker} from '@react-native-community/picker';
import {languageSuportData} from '../api/speech';
import {useDispatch, useSelector} from 'react-redux';
import * as languageActions from '../store/language/language.actions';
import TextOrPicker from '../component/common/TextOrPicker';

const SettingScreen = () => {
  const [learningOptions, setLearningOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [voiceOptions, setVoiceOptions] = useState([]);
  const {userLanguage, learningLanguage, voice} = useSelector(
    (state) => state.language,
  );
  const dispatch = useDispatch();

  const setLearningLanguage = (itemValue, itemIndex) => {
    dispatch(languageActions.setLearningLanguage(itemValue));
    setVoiceOptions(learningOptions[itemIndex].voices || []);
  };
  const setVoice = (itemValue) => {
    dispatch(languageActions.setVoice(itemValue));
  };
  const setUserLanguage = (itemValue) => {
    dispatch(languageActions.setUserLanguage(itemValue));
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
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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
