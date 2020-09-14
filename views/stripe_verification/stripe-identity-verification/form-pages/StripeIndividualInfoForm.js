import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Text, Linking} from 'react-native';
import {Input} from 'react-native-elements';
import RoundedButton from '../../../../components/button/RoundedButton';
import CustomDatePicker from '../../../../components/picker/CustomDatePicker';

const textInputInfo = [
  {
    value: 'first_name',
    placeholder: 'e.g. John',
    label: 'First Name',
    textContentType: 'givenName',
    maxLength: 128,
  },
  {
    value: 'last_name',
    placeholder: 'e.g. Doe',
    label: 'Last Name',
    textContentType: 'familyName',
    maxLength: 128,
  },
  {
    value: 'ssn_last_4',
    placeholder: 'Last 4 Digits',
    label: 'Social Security Number',
    textContentType: 'oneTimeCode',
    maxLength: 4,
    keyboardType: 'numeric',
  },
];

const StripeIndividualInfoForm = ({nextPress}) => {
  const [individual, setindividual] = useState({
    first_name: '',
    last_name: '',
    ssn_last_4: '',
  });
  const [dob, setdob] = useState(null);

  const handleTextChange = (name, text) => {
    setindividual({
      ...individual,
      [name]: text,
    });
  };

  const textInputs = textInputInfo.map((item, i) => {
    const {
      value,
      placeholder,
      label,
      textContentType,
      maxLength,
      keyboardType,
    } = item;
    return (
      <Input
        key={i}
        containerStyle={styles.inputcontainer}
        value={individual[value]}
        onChangeText={text => handleTextChange(value, text)}
        placeholder={placeholder}
        label={label}
        textContentType={textContentType}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    );
  });

  return (
    <ScrollView
      contentContainerStyle={styles.formcontainer}
      keyboardShouldPersistTaps={'handled'}
      accessible={false}>
      {textInputs}
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
            onPress={() => Linking.openURL('https://parq.tech/legal/tos')}>
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
      <View style={styles.buttonContainer}>
        <RoundedButton
          fontSize={18}
          backgroundColor={'#11a4ff'}
          textColor={'white'}
          title={'Next >'}
          onPress={() => console.log(dob, individual)}
        />
      </View>
    </ScrollView>
  );
};

export default StripeIndividualInfoForm;

const styles = StyleSheet.create({
  formcontainer: {
    padding: 32,
    paddingBottom: 128,
  },
  inputcontainer: {
    marginVertical: 8,
  },
  buttonContainer: {
    paddingVertical: 32,
    paddingHorizontal: 64,
  },
  textcontainer: {
    padding: 8,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  textlink: {color: '#11a4ff'},
});
