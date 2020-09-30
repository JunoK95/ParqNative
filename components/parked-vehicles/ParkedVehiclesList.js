import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {ParkedVehiclesListItem} from '.';

const ParkedVehiclesList = ({reservations}) => {
  let parkedVehicles = (
    <View style={styles.container}>
      <View style={styles.textcontainer}>
        <Text style={styles.text}>No Currently Parked Vehicles</Text>
      </View>
    </View>
  );
  if (reservations) {
    if (reservations.length === 0) {
      parkedVehicles = (
        <View style={styles.container}>
          <View style={styles.textcontainer}>
            <Text style={styles.text}>No Currently Parked Vehicles</Text>
          </View>
        </View>
      );
    } else {
      parkedVehicles = reservations.map((reservation, i) => {
        return <ParkedVehiclesListItem key={i} reservation={reservation} />;
      });
    }
  }

  return <ScrollView>{parkedVehicles}</ScrollView>;
};

export default ParkedVehiclesList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 64,
  },
  textcontainer: {
    width: 340,
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
