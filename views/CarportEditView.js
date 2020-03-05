import React, {useEffect, useCallback, useState} from 'react';
import {View} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import {ListItem} from 'react-native-elements';
import {getCurrentReservations} from '../firebase_func/firestoreFunctions';

const CarportEditView = props => {
  const {port, port_id} = props.navigation.state.params;
  const [reservations, setreservations] = useState();

  const fetchReservations = useCallback(async () => {
    const res = await getCurrentReservations({data: port, id: port_id});
    console.log(res);
    setreservations(res);
  }, [port, port_id]);

  useEffect(() => {
    if (!port || !port_id) {
      return;
    }
    fetchReservations();
  }, [fetchReservations, port, port_id]);

  let reserves = [];
  if (reservations) {
    for (var key of Object.keys(reservations)) {
      reserves.push(reservations[key]);
    }
  }

  const reservationsList = reserves.map((r, i) => {
    console.log('r', r);
    return (
      <ListItem
        key={i}
        title={r.vehicle_data.license_plate}
        subtitle={r.user_data.contact.email}
      />
    );
  });

  return (
    <View>
      <HeaderPadding to={'CarportList'} />
      <ListItem title={port.location.address} subtitle={'address'} />
      <ListItem title={port.available_spaces} subtitle={'spaces available'} />
      <ListItem title={port.description} subtitle={'description'} />
      <ListItem title={port.schedule.start} subtitle={'start time'} />
      <ListItem title={port.schedule.end} subtitle={'end time'} />
      <ListItem title={port.schedule.allday.toString()} subtitle={'24h'} />
      {reservationsList}
    </View>
  );
};

export default CarportEditView;
