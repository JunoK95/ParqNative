import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {getCarportDataWithFees} from '../api/firestore_index';
import HeaderPadding from '../components/header-padding/HeaderPadding';
import OrbLoading from '../components/loading/OrbLoading';
import CarportPayCard from '../components/map/CarportPayCard';

const PayParkingView = (props) => {
  const {isFocused} = props;
  const {port} = props.navigation.state.params;
  const [carport, setCarport] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCarportDataWithFees(port.id);
      console.log(data);
      setCarport(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('ERROR LOADING CARPORT DATA');
    }
  }, [port.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, isFocused, port]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <HeaderPadding to={'Search'} title={'Pay Parking'} />
        <View style={styles.loadingContainer}>
          <OrbLoading />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.loadingContainer}>
      <HeaderPadding to={'Search'} title={'Pay Parking'} />
      <View style={styles.container}>
        <CarportPayCard
          port={{...carport, id: port.id}}
          port_id={port.id}
          schedule={carport.schedule}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default withNavigationFocus(PayParkingView);
