import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';

const CardInfoView = props => {
  const {card} = props.navigation.state.params;

  return (
    <View>
      <HeaderPadding to={'Wallet'} />
    </View>
  );
};

export default CardInfoView;

const styles = StyleSheet.create({});
