import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderPadding from '../../../components/header-padding/HeaderPadding';
import {StripeBusinessTypeForm} from './form-pages';
import StripeAdditionalInfoForm from './form-pages/StripeAdditionalInfoForm';

const StripeIdentityVerificationView = () => {
  const [progress, setProgress] = useState(0);
  const [businessType, setBusinessType] = useState('individual');

  const handleSubmit = useCallback(
    fieldValues => {
      console.log('SUBMIT VALUES =>', {...fieldValues, businessType});
    },
    [businessType],
  );

  let page;
  switch (progress) {
    case 0:
      page = (
        <StripeBusinessTypeForm
          businessType={businessType}
          setBusinessType={setBusinessType}
          nextPress={() => setProgress(1)}
        />
      );
      break;
    case 1:
      page = (
        <StripeAdditionalInfoForm
          businessType={businessType}
          nextPress={() => setProgress(2)}
          handleSubmit={handleSubmit}
        />
      );
      break;
    default:
      break;
  }
  return (
    <View>
      <HeaderPadding alt to={'StripeAccountVerification'} />
      {page}
      <Text />
    </View>
  );
};

export default StripeIdentityVerificationView;

const styles = StyleSheet.create({});
