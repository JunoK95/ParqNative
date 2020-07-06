import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SocialIcon} from 'react-native-elements';

function EmailSignInButton({handlePress}) {
  return (
    <View style={styles.buttonContainer}>
      <SocialIcon
        type={'envelope'}
        title={'Sign in with Parq'}
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

export default EmailSignInButton;
