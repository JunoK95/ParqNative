import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Text, Linking} from 'react-native';
import {Input, CheckBox} from 'react-native-elements';
import RoundedButton from '../../../../components/button/RoundedButton';

const textInputInfo = [
  {
    value: 'name',
    placeholder: 'e.g. Parq LLC',
    label: 'Business/Entity Name',
    textContentType: 'organizationName',
    maxLength: 128,
  },
  {
    value: 'tax_id',
    placeholder: 'XX-XXXXXXX',
    label: 'Tax ID (EIN)',
    textContentType: 'familyName',
    maxLength: 12,
  },
];

const StripeBusinessInfoForm = ({nextPress}) => {
  const [formValues, setFormValues] = useState({
    name: '',
    tax_id: '',
  });
  const [businessProfile, setBusinessProfile] = useState({
    url: '',
    product_description: '',
  });
  const [noURL, setNoURL] = useState(false);

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
        value={formValues[value]}
        onChangeText={text => handleTextChange(value, text)}
        placeholder={placeholder}
        label={label}
        textContentType={textContentType}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    );
  });

  const handleTextChange = (name, text) => {
    setFormValues({
      ...formValues,
      [name]: text,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.formcontainer}
      keyboardShouldPersistTaps={'handled'}
      accessible={false}>
      {textInputs}
      <Input
        containerStyle={styles.inputcontainer}
        value={businessProfile.url}
        disabled={noURL}
        onChangeText={text =>
          setBusinessProfile({...businessProfile, url: text})
        }
        placeholder={'e.g. https://www.parq.tech'}
        label={'Business/Entity Website'}
        textContentType={'URL'}
        maxLength={128}
      />
      <CheckBox
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        title={'There is no company website'}
        checked={noURL}
        onPress={() => setNoURL(!noURL)}
      />
      {noURL === true && (
        <Input
          containerStyle={styles.inputcontainer}
          value={businessProfile.product_description}
          onChangeText={text =>
            setBusinessProfile({...businessProfile, product_description: text})
          }
          placeholder={'Enter a description of your business'}
          label={'Business/Entity Description'}
          multiline
          numberOfLines={4}
          textContentType={'jobTitle'}
        />
      )}
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
          onPress={() => console.log(formValues, businessProfile)}
        />
      </View>
    </ScrollView>
  );
};

export default StripeBusinessInfoForm;

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
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  checkboxText: {
    fontSize: 16,
  },
});
