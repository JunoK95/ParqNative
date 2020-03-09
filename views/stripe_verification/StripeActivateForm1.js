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

const StripeActivateForm1 = () => {
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
      return;
    }

    if (birthdate) {
      const newObject = {
        individual: {
          ...individual,
          dob: {...birthdate},
        },
      };
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
            !dob
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
