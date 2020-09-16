import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import RoundedButton from '../../../../components/button/RoundedButton';

const StripeVerificationSuccess = ({handleSuccess}) => {
  return (
    <View style={styles.bg}>
      <View style={styles.contentContainer}>
        <LottieView
          style={styles.lottieContainer}
          source={require('../../../../resources/animations/check.json')}
          autoPlay
          loop={false}
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.loadTitle}>
            Your account has successfully been updated!
          </Text>
        </View>
        <View>
          <RoundedButton
            backgroundColor={'#11A4FF'}
            title={'+ Add Bank For Payouts'}
            textColor={'white'}
            fontSize={18}
            width={260}
            onPress={handleSuccess}
          />
        </View>
      </View>
    </View>
  );
};

export default StripeVerificationSuccess;

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
