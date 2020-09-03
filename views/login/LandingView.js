import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';
import RoundedButton from '../../components/button/RoundedButton';

const LandingView = props => {
  const navigateTo = destination => {
    props.navigation.navigate(destination);
  };

  return (
    <View style={styles.bg}>
      <View style={styles.centeredimg}>
        <Image
          style={styles.image}
          source={require('../../resources/logo/parqdinopoppins.png')}
        />
      </View>
      <View style={styles.centered}>
        <RoundedButton
          title={'Sign In'}
          backgroundColor={'#fff'}
          textColor={'#11a4ff'}
          width={140}
          onPress={() => navigateTo('Login')}
        />
        <RoundedButton
          title={'Sign Up'}
          backgroundColor={'#ffc630'}
          width={140}
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
    alignSelf: 'center',
    width: 300,
  },
  centeredimg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 96,
  },
  centered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default LandingView;
