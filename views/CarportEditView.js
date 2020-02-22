import React from 'react';
import {View} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';

const CarportEditView = props => {
  const {params} = props.navigation.state;

  console.log('this is edit', params);
  return (
    <View>
      <HeaderPadding to={'CarportList'} />
    </View>
  );
};

export default CarportEditView;
