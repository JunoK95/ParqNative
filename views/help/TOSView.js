import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';

const TOSView = () => {
  return (
    <View>
      <HeaderPadding to={'HelpMenu'} title={'TOS'} alt />
    </View>
  );
};

export default TOSView;

const styles = StyleSheet.create({});
