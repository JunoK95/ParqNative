import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LoadingView from './LoadingView';
import OrbLoading from '../components/loading/OrbLoading';
import HeaderPadding from '../components/header-padding/HeaderPadding';

const SandboxView = () => {
  return (
    <View>
      <HeaderPadding to={'Home'} />
      <OrbLoading />
    </View>
  );
};

export default SandboxView;

const styles = StyleSheet.create({});
