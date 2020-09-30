import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import CarportCard from '../map/CarportCard';

const NearbyList = props => {
  const {carports, currentlocation, setopen} = props;
  const availableCarports = carports.filter(port => {
    return port.isAvailable;
  });
  console.log('AVAILABLE CARPORTS => ', availableCarports);

  if (availableCarports.length > 0) {
    return (
      <FlatList
        contentContainerStyle={styles.listcontainer}
        data={availableCarports}
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
      <ScrollView contentContainerStyle={styles.listcontainer}>
        <View style={styles.container}>
          <Text style={styles.text}>No Nearby Parking</Text>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  listcontainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: Dimensions.get('window').width - 64,
    height: 48,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontFamily: 'Montserrat-MediumItalic',
  },
});

export default NearbyList;
