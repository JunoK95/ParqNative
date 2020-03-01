import React from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import ReservationItem from './ReservationItem';

const ReservationList = props => {
  const {reservations} = props;

  let reservationList;
  if (reservations.length > 0) {
    reservationList = reservations.map((r, i) => {
      const {data} = r;
      return (
        <ReservationItem key={i} port={data.carport_data} reservation={data} />
      );
    });
  } else {
    reservationList = (
      <View style={styles.textcontainer}>
        <Text style={styles.text}>No Current Reservations</Text>
      </View>
    );
  }

  console.log('reservation list', reservations);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {reservationList}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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

export default ReservationList;
