import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import {removePunctuation} from '../../util/removePunctuation';
import RecordingListItem from './RecordingListItem';
import RecordingListItemHiden from './RecordingListItemHiden';

const RecordingList = () => {
  const recordings = useSelector((state) => state.recordings.recordings);
  const {translation} = useSelector((state) => state.whatToSay);

  const playSound = ({sound}) => {
    if (!sound) {
      return null;
    }
    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const compare = (t1, t2) =>
    removePunctuation(t1).toLowerCase() === removePunctuation(t2).toLowerCase();

  const renderHidenItem = (data, rowMap) => (
    <RecordingListItemHiden rowMap={rowMap} data={data} />
  );

  const renderItems = ({item}) => {
    const correct = compare(item?.whatIsSaid?.text, translation);
    return (
      <RecordingListItem
        item={item}
        playSound={() => playSound(item)}
        correct={correct}
      />
    );
  };

  return (
    <SwipeListView
      data={recordings.filter((item) => item.audioFile)}
      keyExtractor={(item) => item.id}
      renderItem={renderItems}
      renderHiddenItem={renderHidenItem}
      leftOpenValue={75}
      rightOpenValue={-150}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
    />
  );
};

const styles = StyleSheet.create({});

export default RecordingList;
