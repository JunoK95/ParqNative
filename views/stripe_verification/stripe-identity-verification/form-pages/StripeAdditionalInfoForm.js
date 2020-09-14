import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StripeIndividualInfoForm from './StripeIndividualInfoForm';
import StripeBusinessInfoForm from './StripeBusinessInfoForm';

const StripeAdditionalInfoForm = ({businessType}) => {
  let formPage;
  switch (businessType) {
    case 'individual':
      formPage = <StripeIndividualInfoForm />;
      break;
    default:
      formPage = <StripeBusinessInfoForm />;
      break;
  }
  return <View>{formPage}</View>;
};

export default StripeAdditionalInfoForm;

const styles = StyleSheet.create({});
