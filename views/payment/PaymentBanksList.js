import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from 'react-navigation';

const PaymentBanksList = props => {
  const {banks} = props;
  console.log('We got Banks = ', banks);
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('#ffecb9')}
      onPress={() => props.navigation.navigate('StripeAccountVerification')}>
      <View style={styles.item}>
        <View style={styles.row}>
          <Icon style={styles.itemicon} name={'plus-circle'} size={20} />
          <Text style={styles.itemtext}>{'Add Bank Account'}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default withNavigation(PaymentBanksList);

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  itemicon: {
    paddingHorizontal: 20,
  },
});
