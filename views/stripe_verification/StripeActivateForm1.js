import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, ScrollView, Linking} from 'react-native';
import {Input, Button} from 'react-native-elements';
import CustomDatePicker from '../../components/picker/CustomDatePicker';
import {AuthContext} from '../../context/AuthContext';
import {stripeUpdateAccountAndTOS} from '../../api/stripe_index';
import {updateUserData} from '../../firebase_func';

const StripeActivateForm1 = props => {
  const {account, setprogress, refresh, setrefresh} = props;
  const context = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [dob, setdob] = useState(null);
  const [phone, setphone] = useState('');
  const [individual, setindividual] = useState({
    first_name: '',
    last_name: '',
    ssn_last_4: '',
  });

  const handleIndividualChange = (name, text) => {
    setindividual({
      ...individual,
      [name]: text,
    });
  };

  const normalizeInput = (value, previousValue) => {
    if (!value) {
      return value;
    }
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) {
        return currentValue;
      }
      if (cvLength < 7) {
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      }
      // eslint-disable-next-line prettier/prettier
      return (`(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`);
    }
  };

  const handlePhoneChange = number => {
    setphone(normalizeInput(number));
  };

  const handleSubmit = async () => {
    setloading(true);
    let birthdate;
    if (dob.valueOf()) {
      // Valid date
      console.log(dob.getFullYear(), dob.getMonth(), dob.getDate());
      birthdate = {
        month: dob.getMonth() + 1,
        day: dob.getDate(),
        year: dob.getFullYear(),
      };
    } else {
      console.log('Invalid Date');
      setloading(false);
      return;
    }

    if (birthdate) {
      const stripeUpdateData = {
        individual: {
          ...individual,
          dob: {...birthdate},
        },
      };

      const updateData = {
        first_name: individual.first_name,
        last_name: individual.last_name,
        dob: dob,
        phone: phone,
      };

      const response = await stripeUpdateAccountAndTOS({
        account_id: account.id,
        uid: context.user_id,
        updates: stripeUpdateData,
      });

      if (response.error) {
        console.error('ERROR UPDATING STRIPE CONNECT ACCOUNT');
      } else {
        updateUserData(context.user_id, updateData);
        setprogress(0);
        setrefresh(!refresh);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.formcontainer}>
      <Input
        containerStyle={styles.inputcontainer}
        value={individual.first_name}
        onChangeText={text => handleIndividualChange('first_name', text)}
        placeholder={'e.g. John'}
        label={'First Name'}
        textContentType={'givenName'}
      />
      <Input
        containerStyle={styles.inputcontainer}
        value={individual.last_name}
        onChangeText={text => handleIndividualChange('last_name', text)}
        placeholder={'e.g. Doe'}
        label={'Last Name'}
        textContentType={'familyName'}
      />
      <Input
        containerStyle={styles.inputcontainer}
        value={phone}
        onChangeText={text => handlePhoneChange(text)}
        placeholder={'(xxx) xxx-xxxx'}
        label={'Phone Number'}
        keyboardType={'phone-pad'}
        textContentType={'telephoneNumber'}
      />
      <Input
        containerStyle={styles.inputcontainer}
        value={individual.ssn_last_4}
        onChangeText={text => handleIndividualChange('ssn_last_4', text)}
        placeholder={'Last 4 Digits'}
        maxLength={4}
        label={'Social Security Number'}
        keyboardType={'numeric'}
      />
      <CustomDatePicker
        dateType={'date'}
        title={'Date of Birth'}
        setselected={setdob}
        selected={dob}
      />
      <View style={styles.textcontainer}>
        <Text style={styles.text}>
          By registering your account, you agree to our {''}
          <Text
            style={styles.textlink}
            onPress={() =>
              Linking.openURL('https://stripe.com/connect-account/legal')
            }>
            Services Agreement
          </Text>{' '}
          and the{' '}
          <Text
            style={styles.textlink}
            onPress={() =>
              Linking.openURL('https://stripe.com/connect-account/legal')
            }>
            Stripe Connected Account Agreement.
          </Text>
        </Text>
      </View>
      <Button
        disabled={
          individual.first_name === '' ||
          individual.last_name === '' ||
          individual.ssn_last_4.length !== 4 ||
          phone.length < 14 ||
          !dob ||
          loading
        }
        disabledStyle={styles.disabledButton}
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
  );
};

export default StripeActivateForm1;

const styles = StyleSheet.create({
  formcontainer: {
    padding: 32,
    paddingBottom: 128,
  },
  inputcontainer: {
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
  },
  rowItem: {
    flex: 1,
  },
  textcontainer: {
    padding: 8,
    margin: 16,
  },
  text: {textAlign: 'center', fontFamily: 'Montserrat-Medium'},
  textlink: {color: '#11a4ff'},
  disabledButton: {
    opacity: 0.3,
  },
});
