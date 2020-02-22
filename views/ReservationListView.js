import React, {useContext, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import {AuthContext} from '../context/AuthContext';

const ReservationListView = () => {
  const context = useContext(AuthContext);
  const [loading, setloading] = useState(true);
  const [reservations, setreservations] = useState();
  useEffect(() => {
    setloading(true);
    context.functions.reservationHistory().then(res => {
      setreservations(res);
      setloading(false);
    });
  }, [context]);

  return (
    <View>
      <HeaderPadding to={'Home'} />
      <Text>Reservation LIst View</Text>
    </View>
  );
};

export default ReservationListView;
