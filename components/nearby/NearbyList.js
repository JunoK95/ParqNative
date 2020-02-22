import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import CarportCard from '../map/CarportCard';

const NearbyList = props => {
  const {carports, currentlocation, setopen} = props;
  if (carports.length > 0) {
    return (
      <FlatList
        contentContainerStyle={styles.listcontainer}
        data={carports}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <CarportCard
              port={item}
              currentlocation={currentlocation}
              setopen={setopen}
            />
          );
        }}
      />
    );
  } else {
    return (
      <ListItem
        title={'No Nearby Parking Available'}
        leftIcon={{name: 'sentiment-dissatisfied', color: '#000'}}
      />
    );
  }
};

const styles = StyleSheet.create({
  listcontainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
});

export default NearbyList;
