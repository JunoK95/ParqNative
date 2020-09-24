import React, {useState, useEffect, useCallback} from 'react';
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
    maxLength: 10,
  },
];

const StripeBusinessInfoForm = ({handleSubmit}) => {
  const [formValues, setFormValues] = useState({
    name: '',
    tax_id: '',
  });
  const [businessProfile, setBusinessProfile] = useState({
    url: '',
    product_description: '',
  });
  const [noURL, setNoURL] = useState(false);
  const [valid, setValid] = useState({
    name: false,
    tax_id: false,
    product_description: false,
    url: false,
  });

  function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    s = s.toLowerCase();
    return regexp.test(s);
  }

  const checkFormat = useCallback(() => {
    const {name, tax_id} = formValues;
    const {url, product_description} = businessProfile;
    var patternEIN = /^\d{2}\-?\d{7}$/;

    let isValid = {
      name: false,
      tax_id: false,
      product_description: false,
      url: false,
    };

    if (name.length > 1) {
      isValid.name = true;
    }
    if (patternEIN.test(tax_id)) {
      isValid.tax_id = true;
    }
    if (noURL) {
      if (product_description.length > 1) {
        isValid.product_description = true;
      }
    } else {
      if (isUrl(url)) {
        isValid.url = true;
      }
    }
    setValid(isValid);
  }, [businessProfile, formValues, noURL]);

  useEffect(() => {
    checkFormat();
  }, [formValues, businessProfile, checkFormat]);

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
        rightIcon={
          valid[value]
            ? {type: 'font-awesome', name: 'check', color: 'green'}
            : {type: 'font-awesome', name: 'times', color: 'red'}
        }
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

  const handleNext = () => {
    const {name, tax_id} = formValues;
    if (noURL) {
      if (valid.product_description && valid.name && valid.tax_id) {
        handleSubmit({
          company: {
            name,
            tax_id,
          },
          business_profile: {
            product_description: businessProfile.product_description,
          },
        });
      }
    } else {
      if (valid.url && valid.name && valid.tax_id) {
        handleSubmit({
          company: {
            name,
            tax_id,
          },
          business_profile: {
            url: businessProfile.url.toLowerCase(),
          },
        });
      }
    }
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
        rightIcon={
          valid.url || noURL
            ? {type: 'font-awesome', name: 'check', color: 'green'}
            : {type: 'font-awesome', name: 'times', color: 'red'}
        }
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
          rightIcon={
            valid.product_description
              ? {type: 'font-awesome', name: 'check', color: 'green'}
              : {type: 'font-awesome', name: 'times', color: 'red'}
          }
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
          disabled={
            !valid.name ||
            !valid.tax_id ||
            (!valid.url && !noURL) ||
            (!valid.product_description && noURL)
          }
          width={200}
          backgroundColor={'#11a4ff'}
          textColor={'white'}
          title={'Next >'}
          onPress={handleNext}
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
    alignItems: 'center',
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
