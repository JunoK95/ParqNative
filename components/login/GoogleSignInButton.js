import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SocialIcon} from 'react-native-elements';

function GoogleSignInButton({handlePress}) {
  return (
    <View style={styles.buttonContainer}>
      <SocialIcon
        type={'google'}
        title={'Sign in with Google'}
        button
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 48,
  },
});

export default GoogleSignInButton;
