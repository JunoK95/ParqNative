import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Modal} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';
import AddressForm from '../../components/carport/AddressForm';
import ModalHeaderPadding from '../../components/carport/ModalHeaderPadding';
import AddressForm2 from '../../components/carport/AddressForm2';
import AddressSubmissionForm from './AddressSubmissionForm';

const CarportRegisterView = () => {
  return (
    <View style={styles.screen}>
      <HeaderPadding to={'CarportList'} />
      <View style={styles.screen}>
        <AddressSubmissionForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CarportRegisterView;
