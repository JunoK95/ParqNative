import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import CarportPayCard from '../components/map/CarportPayCard';

const PayParkingView = props => {
  const {port} = props.navigation.state.params;

  return (
    <View>
      <HeaderPadding to={'Nearby'} title={'Pay Parking'} />
      <View style={styles.container}>
        <CarportPayCard port={port} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default PayParkingView;
