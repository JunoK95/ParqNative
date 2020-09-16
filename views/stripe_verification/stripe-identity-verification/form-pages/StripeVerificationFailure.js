import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import RoundedButton from '../../../../components/button/RoundedButton';
import {withNavigation} from 'react-navigation';

const StripeVerificationFailure = ({navigation, handleFail}) => {
  return (
    <View style={styles.bg}>
      <View style={styles.contentContainer}>
        <LottieView
          style={styles.lottieContainer}
          source={require('../../../../resources/animations/x-animation.json')}
          autoPlay
          loop={false}
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.loadTitle}>
            There's been an issue updating your account.{'\n \n'}Please Try
            Again Later.
          </Text>
        </View>
        <View>
          <RoundedButton
            backgroundColor={'#11A4FF'}
            title={'< Go Back'}
            textColor={'white'}
            fontSize={18}
            width={260}
            onPress={handleFail}
          />
        </View>
      </View>
    </View>
  );
};

export default withNavigation(StripeVerificationFailure);

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc630',
    paddingVertical: 32,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 64,
  },
  lottieContainer: {
    width: '40%',
  },
  descriptionContainer: {
    paddingVertical: 32,
    paddingHorizontal: 48,
  },
  loadTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
});
