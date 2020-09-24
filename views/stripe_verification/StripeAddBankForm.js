import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Input, Button, CheckBox} from 'react-native-elements';
import stripe from 'tipsi-stripe';
import RoundedButton from '../../components/button/RoundedButton';

const StripeAddBankForm = ({handleBackClick, handleBankToken}) => {
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

  const handleAccountTypeChange = type => {
    setinputs({
      ...inputs,
      accountHolderType: type,
    });
  };

  const handleSubmit = async () => {
    try {
      setloading(true);
      seterror(null);
      settoken(null);
      const bankToken = await stripe.createTokenWithBankAccount(inputs);
      if (bankToken) {
        handleBankToken(bankToken);
        setloading(false);
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
        <View style={styles.accountTypeContainer}>
          <Text style={styles.checkboxTitle}>Account Type</Text>
          <View style={styles.checkboxRow}>
            <CheckBox
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
              title={'Individual'}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={inputs.accountHolderType === 'individual'}
              onPress={() => handleAccountTypeChange('individual')}
            />
            <CheckBox
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
              title={'Company'}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={inputs.accountHolderType === 'company'}
              onPress={() => handleAccountTypeChange('company')}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
            fontSize={18}
            width={200}
            backgroundColor={'#11a4ff'}
            textColor={'white'}
            disabled={
              inputs.accountNumber === '' ||
              inputs.routingNumber.length !== 9 ||
              inputs.accountHolderName === '' ||
              loading
            }
            title={'Submit'}
            onPress={() => handleSubmit()}
          />
        </View>
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
  buttonContainer: {
    paddingVertical: 32,
    alignItems: 'center',
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
  accountTypeContainer: {
    marginVertical: 12,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  checkboxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#87939e',
    paddingLeft: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
  },
  checkboxText: {
    fontSize: 16,
  },
});
