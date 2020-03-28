import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';

const HelpView = () => {
  return (
    <View>
      <HeaderPadding to={'Home'} alt />
      <Text>HELP</Text>
    </View>
  );
};

export default HelpView;

const styles = StyleSheet.create({});
