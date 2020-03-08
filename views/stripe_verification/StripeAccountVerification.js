import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StripeActivate0 from './StripeActivate0';
import HeaderPadding from '../../components/layout/HeaderPadding';

const StripeAccountVerification = () => {
  const [progress, setprogress] = useState(0);

  let content;
  switch (progress) {
    case 0:
      content = <StripeActivate0 />;
      break;
    default:
      break;
  }

  return (
    <View>
      <HeaderPadding to={'PaymentSetting'} alt />
      {content}
    </View>
  );
};

export default StripeAccountVerification;
