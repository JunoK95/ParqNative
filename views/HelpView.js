import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';

const HelpView = () => {
  return (
    <View>
      <HeaderPadding to={'Home'} title={'Help'} alt />
      <Text>HELP</Text>
    </View>
  );
};

export default HelpView;

const styles = StyleSheet.create({});
