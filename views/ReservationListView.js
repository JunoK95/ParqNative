import React, {useContext, useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import {AuthContext} from '../context/AuthContext';
import ReservationList from '../components/reservation/ReservationList';
import moment from 'moment';

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

  if (!loading) {
    const activeReservations = reservations.filter(res => {
      return res.data.end > moment().unix();
    });
    return (
      <View>
        <HeaderPadding title={'Reservations'} to={'Home'} />
        <ReservationList reservations={activeReservations} />
      </View>
    );
  } else {
    return (
      <View>
        <HeaderPadding title={'Reservations'} to={'Home'} />
        <ActivityIndicator />
      </View>
    );
  }
};

export default ReservationListView;
