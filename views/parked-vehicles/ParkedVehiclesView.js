import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderPadding from '../../components/header-padding/HeaderPadding';
import {ParkedVehiclesList} from '../../components/parked-vehicles';
import {getCurrentReservations} from '../../firebase_func';
import { withNavigationFocus } from 'react-navigation';
import OrbLoading from '../../components/loading/OrbLoading';

const ParkedVehiclesView = props => {
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState(null);
  const {port_id} = props.navigation.state.params;

  const getReservations = useCallback(async () => {
    setLoad(true);
    const reserves = await getCurrentReservations(port_id);
    console.log('RESERVATIONS =>', port_id, reserves);
    setReservations(reserves);
  }, [port_id]);

  useEffect(() => {
    getReservations();
  }, [getReservations, port_id, props.isFocused]);

  useEffect(() => {
    setLoad(false);
  }, [reservations]);

  if (!port_id) {
    setError('Could Not Get Parking ID');
    console.error('Could Not Get Parking ID');
  }

  if (load) {
    return <OrbLoading />;
  }
  return (
    <View>
      <HeaderPadding to={'Home'} />
      <ParkedVehiclesList reservations={reservations} />
    </View>
  );
};

export default withNavigationFocus(ParkedVehiclesView);

const styles = StyleSheet.create({});
