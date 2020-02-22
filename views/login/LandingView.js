import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';

const LandingView = props => {
  const navigateTo = destination => {
    props.navigation.navigate(destination);
  };

  return (
    <View style={styles.bg}>
      <View style={styles.centeredimg}>
        <Image
          style={styles.image}
          source={require('../../resources/logo/parqdino.png')}
        />
      </View>
      <View style={styles.centered}>
        <Button
          style={styles.button}
          title="Sign In"
          onPress={() => navigateTo('Login')}
        />
        <Button
          style={styles.button}
          title="Sign Up"
          onPress={() => navigateTo('Register')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#11a4ff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
    alignContent: 'center',
    width: 200,
    height: 262,
  },
  button: {
    width: 300,
  },
  centeredimg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 96,
  },
  centered: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default LandingView;
