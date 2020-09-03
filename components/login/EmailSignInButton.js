import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {SocialIcon} from 'react-native-elements';

function EmailSignInButton({handlePress}) {
  return (
    <View style={styles.buttonContainer}>
      <SocialIcon
        type={'envelope'}
        title={'Sign in with Parq'}
        style={styles.button}
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
  button: {
    width: Dimensions.get('window').width - 96,
  },
});

export default EmailSignInButton;
