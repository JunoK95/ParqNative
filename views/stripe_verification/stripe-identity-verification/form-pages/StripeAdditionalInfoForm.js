import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StripeIndividualInfoForm from './StripeIndividualInfoForm';
import StripeBusinessInfoForm from './StripeBusinessInfoForm';

const StripeAdditionalInfoForm = ({businessType, handleSubmit}) => {
  let formPage;
  switch (businessType) {
    case 'individual':
      formPage = <StripeIndividualInfoForm handleSubmit={handleSubmit} />;
      break;
    default:
      formPage = <StripeBusinessInfoForm handleSubmit={handleSubmit} />;
      break;
  }
  return <View>{formPage}</View>;
};

export default StripeAdditionalInfoForm;
