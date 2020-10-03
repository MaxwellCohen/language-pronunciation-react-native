import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import {removePunctuation} from '../../util/removePunctuation';
import RecordingListItem from './RecordingListItem';
import RecordingListItemHidden from './RecordingListItemHidden';

const RecordingList = () => {
  const recordings = useSelector((state) => state.recordings.recordings);
  const {translation, sound: SSTSound} = useSelector(
    (state) => state.whatToSay,
  );

  const compare = (t1, t2) =>
    removePunctuation(t1).toLowerCase() === removePunctuation(t2).toLowerCase();

  const renderHidenItem = ({item}, rowMap) => (
    <RecordingListItemHidden rowMap={rowMap} item={item} />
  );

  const renderItems = ({item}) => {
    const correct = compare(item?.whatIsSaid?.text, translation);
    return (
      <RecordingListItem item={item} sstSound={SSTSound} correct={correct} />
    );
  };

  return (
    <SwipeListView
      data={recordings.filter((item) => item.audioFile)}
      keyExtractor={(item) => item.id}
      renderItem={renderItems}
      renderHiddenItem={renderHidenItem}
      rightOpenValue={-150}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      disableRightSwipe
      recalculateHiddenLayout
    />
  );
};

const styles = StyleSheet.create({});

export default RecordingList;
