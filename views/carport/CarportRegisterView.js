import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';
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
