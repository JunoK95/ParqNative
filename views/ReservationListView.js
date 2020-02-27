import React, {useContext, useState, useEffect, useCallback} from 'react';
import {View, ActivityIndicator, TouchableOpacity} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import {AuthContext} from '../context/AuthContext';
import ReservationList from '../components/reservation/ReservationList';
import {Icon} from 'react-native-elements';
import moment from 'moment';

const ReservationListView = () => {
  const context = useContext(AuthContext);
  const [loading, setloading] = useState(true);
  const [reservations, setreservations] = useState();

  const fetchData = useCallback(async () => {
    setloading(true);
    context.functions.reservationHistory().then(res => {
      setreservations(res);
      setloading(false);
    });
  }, [context.functions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshbutton = (
    <TouchableOpacity onPress={() => fetchData()}>
      <Icon name={'refresh'} size={30} />
    </TouchableOpacity>
  );

  if (!loading) {
    const activeReservations = reservations.filter(res => {
      return res.data.end > moment().unix();
    });
    return (
      <View>
        <HeaderPadding
          title={'Reservations'}
          to={'Home'}
          right={refreshbutton}
        />
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
