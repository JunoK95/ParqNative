import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const ProfilePicture = props => {
  return (
    <View style={styles.container}>
      <Image source={require('../../helpers/ParqDino')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default ProfilePicture;
