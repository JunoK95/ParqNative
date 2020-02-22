import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {getTimePeriod} from '../../helpers/helper';
import GoToSearch from './GoToSearch';
import CurrentLocationButton from './CurrentLocationButton';
import SavedLocations from '../nearby/SavedLocations';

const HomeOverlay = () => {
  const timeperiod = getTimePeriod();

  return (
    <View style={styles.overlay}>
      <Card containerStyle={styles.card}>
        <Text style={styles.greeting}>- Good {timeperiod} -</Text>
      </Card>
      <ScrollView>
        <GoToSearch />
        <CurrentLocationButton />
        <SavedLocations />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: '#11a4ff',
    width: '100%',
  },
  searchBar: {
    borderWidth: 0,
    margin: 0,
    height: 48,
    backgroundColor: '#fff',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  inputContainer: {
    margin: 12,
    marginTop: 8,
  },
  greeting: {
    padding: 10,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  listTitle: {
    fontSize: 20,
    paddingLeft: 12,
  },
});

export default HomeOverlay;
