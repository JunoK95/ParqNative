import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';
import HeaderPadding from '../../components/layout/HeaderPadding';
import stripe from 'tipsi-stripe';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios';
import {AuthContext} from '../../context/AuthContext';

const AddBankView = props => {
  const context = useContext(AuthContext);
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

  const handleClick = type => {
    setinputs({
      ...inputs,
      accountHolderType: type,
    });
  };

  const handleSubmit = async () => {
    console.log(inputs);
    try {
      setloading(true);
      seterror(null);
      settoken(null);
      const bankToken = await stripe.createTokenWithBankAccount(inputs);
      console.log('Bank Token => ', bankToken);
      if (bankToken && context.user_id) {
        const newBank = await Axios({
          method: 'POST',
          url:
            'https://us-central1-parq-dev.cloudfunctions.net/stripeCreateCard',
          data: {
            customer_id: context.user_id.stripe_customer_id,
            cardToken: bankToken.tokenId,
          },
        });
        console.log('new card created => ', newBank);
      }
      setloading(false);
      settoken(bankToken);
    } catch (err) {
      setloading(false);
      seterror(err);
      console.log(err);
    }
  };

  return (
    <View>
      <HeaderPadding to={'PaymentSetting'} alt />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.formcontainer}>
          {error != null && (
            <View>
              <Text style={styles.errorText}>Error Adding Bank Account</Text>
            </View>
          )}
          <Input
            containerStyle={styles.textField}
            name={'accountNumber'}
            label={'Account Number'}
            placeholder={'e.g. 000123456789'}
            value={inputs.accountNumber}
            onChangeText={text => handleChange('accountNumber', text)}
          />
          <Input
            containerStyle={styles.textField}
            name={'routingNumber'}
            label={'Routing Number'}
            placeholder={'e.g. 110000000'}
            value={inputs.routingNumber}
            onChangeText={text => handleChange('routingNumber', text)}
          />
          <Input
            containerStyle={styles.textField}
            name={'accountHolderName'}
            placeholder={'e.g. John Doe'}
            label={'Account Holder Name'}
            value={inputs.accountHolderName}
            onChangeText={text => handleChange('accountHolderName', text)}
          />
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => handleClick('individual')}>
              {inputs.accountHolderType === 'individual' ? (
                <FontAwesome5Icon
                  name={'dot-circle'}
                  size={20}
                  color={'#888'}
                />
              ) : (
                <FontAwesome5Icon name={'circle'} size={20} color={'#aaa'} />
              )}
              <Text style={styles.buttonText2}> Individual</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => handleClick('company')}>
              {inputs.accountHolderType === 'company' ? (
                <FontAwesome5Icon
                  name={'dot-circle'}
                  size={20}
                  color={'#888'}
                />
              ) : (
                <FontAwesome5Icon name={'circle'} size={20} color={'#aaa'} />
              )}
              <Text style={styles.buttonText2}> Company</Text>
            </TouchableOpacity>
          </View>
          <TouchableHighlight
            style={styles.button}
            underlayColor={'#ffc630'}
            onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Add Bank</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddBankView;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 64,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingVertical: 8,
    paddingRight: 12,
    color: '#ffc630',
  },
  formcontainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  textFieldContainer: {
    margin: 12,
    marginHorizontal: 64,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textField: {
    minWidth: 260,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  buttonContainer: {
    margin: 12,
    marginHorizontal: 48,
    alignContent: 'center',
    justifyContent: 'center',
  },
  button2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    margin: 8,
    width: 110,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#11a4ff',
    borderRadius: 20,
    margin: 8,
    width: 240,
  },
  buttondisabled: {
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#11a4ff',
    opacity: 0.3,
    borderRadius: 20,
    margin: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  buttonText2: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});
