import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Button,
} from 'react-native';
import {Input} from 'react-native-elements';
import CustomDatePicker from '../../components/picker/CustomDatePicker';
import Axios from 'axios';

const StripeActivateForm1 = props => {
  const {account, setprogress, refresh, setrefresh} = props;
  const [loading, setloading] = useState(false);
  const [dob, setdob] = useState(null);
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

  const handleSubmit = () => {
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
      const newObject = {
        individual: {
          ...individual,
          dob: {...birthdate},
        },
      };
      Axios({
        method: 'POST',
        url:
          'https://us-central1-parq-dev.cloudfunctions.net/stripeUpdateAccountWithTOS',
        data: {
          account_id: account.id,
          updates: newObject,
        },
      }).then(() => {
        setprogress(0);
        setrefresh(!refresh);
      });
    }
  };

  return (
    <View>
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
          value={individual.ssn_last_4}
          onChangeText={text => handleIndividualChange('ssn_last_4', text)}
          placeholder={'Last 4 Digits'}
          maxLength={4}
          label={'Social Security Number'}
          keyboardType={'numeric'}
        />
        <CustomDatePicker
          dateType={'date'}
          initialDate={new Date()}
          title={'Date of Birth'}
          setselected={setdob}
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
            !dob ||
            loading
          }
          disabledStyle={styles.disabledButton}
          title={'Submit'}
          onPress={() => handleSubmit()}
        />
      </ScrollView>
    </View>
  );
};

export default StripeActivateForm1;

const styles = StyleSheet.create({
  formcontainer: {
    padding: 32,
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
