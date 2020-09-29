import React from 'react';
import {ScrollView} from 'react-native';
import {ParkedVehiclesListItem} from '.';

const ParkedVehiclesList = ({reservations}) => {
  let parkedVehicles;
  if (reservations) {
    parkedVehicles = reservations.map((reservation, i) => {
      return <ParkedVehiclesListItem key={i} reservation={reservation} />;
    });
  }

  return <ScrollView>{parkedVehicles}</ScrollView>;
};

export default ParkedVehiclesList;
