import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import ReservationItem from './ReservationItem';

const ReservationList = props => {
  const {reservations} = props;

  let reservationList;
  if (reservations) {
    reservationList = reservations.map((r, i) => {
      const {data} = r;
      return <ReservationItem key={i} port={data.carport_data} />;
    });
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
});

export default ReservationList;
