import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import stripe from 'tipsi-stripe';
import {stripeAddExternalAccount} from '../../api/stripe_index';

const StripeAddBankForm = props => {
  const {account, setprogress, refresh, setrefresh} = props;
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [token, settoken] = useState(null);
  const [inputs, setinputs] = useState({
    // mandatory
    accountNumber: '',
    countryCode: 'us',
    currency: 'usd',
    routingNumber: '', // 9 digits
    // optional
    accountHolderName: '',
    accountHolderType: 'individual', // "company" or "individual"
  });

  const handleChange = (name, text) => {
    setinputs({
      ...inputs,
      [name]: text,
    });
  };

  const handleSubmit = async () => {
    try {
      setloading(true);
      seterror(null);
      settoken(null);
      const bankToken = await stripe.createTokenWithBankAccount(inputs);
      if (bankToken) {
        const response = await stripeAddExternalAccount(account.id, bankToken);
        if (response.error) {
          setloading(false);
          console.log('ERROR ADDING EXTERNAL ACCOUNT => ', response.error);
          seterror(response.error);
        } else {
          setloading(false);
          setrefresh(!refresh);
          setprogress(0);
        }
      }
    } catch (err) {
      setloading(false);
      seterror(err);
      console.log(err);
    }
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.formcontainer}
        keyboardShouldPersistTaps={'handled'}
        accessible={false}>
        {error != null && (
          <View>
            <Text style={styles.errorText}>Error Adding Bank Account</Text>
          </View>
        )}
        <Input
          containerStyle={styles.inputcontainer}
          name={'accountNumber'}
          label={'Account Number'}
          placeholder={'e.g. 000123456789'}
          value={inputs.accountNumber}
          onChangeText={text => handleChange('accountNumber', text)}
          keyboardType={'numeric'}
        />
        <Input
          containerStyle={styles.inputcontainer}
          name={'routingNumber'}
          label={'Routing Number'}
          placeholder={'e.g. 110000000'}
          value={inputs.routingNumber}
          onChangeText={text => handleChange('routingNumber', text)}
          maxLength={9}
          keyboardType={'numeric'}
        />
        <Input
          containerStyle={styles.inputcontainer}
          name={'accountHolderName'}
          placeholder={'e.g. John Doe'}
          label={'Account Holder Name'}
          value={inputs.accountHolderName}
          onChangeText={text => handleChange('accountHolderName', text)}
        />
        <Button
          disabled={
            inputs.accountNumber === '' ||
            inputs.routingNumber.length !== 9 ||
            inputs.accountHolderName === '' ||
            loading
          }
          containerStyle={styles.button}
          raised
          title={'Submit'}
          onPress={() => handleSubmit()}
        />
        <Button
          containerStyle={styles.button}
          title={'Back'}
          type={'clear'}
          raised
          onPress={() => setprogress(0)}
        />
      </ScrollView>
    </View>
  );
};

export default StripeAddBankForm;

const styles = StyleSheet.create({
  formcontainer: {
    padding: 32,
    paddingTop: 12,
  },
  inputcontainer: {
    marginVertical: 16,
  },
  button: {
    marginVertical: 8,
  },
  disabledbutton: {
    marginVertical: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});
