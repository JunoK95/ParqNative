import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoadingView from './LoadingView';
import OrbLoading from '../components/loading/OrbLoading';

const SandboxView = () => {
  return (
    <View>
      <OrbLoading />
    </View>
  );
};

export default SandboxView;

const styles = StyleSheet.create({});
