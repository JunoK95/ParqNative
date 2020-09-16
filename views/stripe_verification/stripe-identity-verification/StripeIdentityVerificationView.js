import React, {useState, useCallback, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderPadding from '../../../components/header-padding/HeaderPadding';
import {StripeBusinessTypeForm, StripeVerificationSuccess} from './form-pages';
import StripeAdditionalInfoForm from './form-pages/StripeAdditionalInfoForm';
import {AuthContext} from '../../../context/AuthContext';
import {stripeUpdateAccountAndTOS} from '../../../api/stripe_index';
import OrbLoading from '../../../components/loading/OrbLoading';
import StripeVerificationFailure from './form-pages/StripeVerificationFailure';
import {withNavigation} from 'react-navigation';

const StripeIdentityVerificationView = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const [businessType, setBusinessType] = useState('individual');
  const context = useContext(AuthContext);

  const handleSubmit = useCallback(
    async fieldValues => {
      const {user_id, user_data} = context;
      setProgress('loading');
      const updates = {...fieldValues, businessType};
      console.log('SUBMIT VALUES =>', updates);
      try {
        // await stripeUpdateAccountAndTOS(
        //   user_id,
        //   user_data.stripe_account_id,
        //   updates,
        // );
        setProgress('success');
      } catch (e) {
        setProgress('failure');
        console.error(e);
      }
    },
    [businessType, context],
  );

  const handleFail = useCallback(() => {
    setProgress(0);
    navigation.navigate('Home');
  }, [navigation]);

  const handleSuccess = useCallback(() => {
    setProgress(0);
    navigation.navigate('StripeAddBankAccount');
  }, [navigation]);

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
    case 'loading':
      page = <OrbLoading bgcolor={'#ffc630'} />;
      break;
    case 'success':
      page = <StripeVerificationSuccess handleSuccess={handleSuccess} />;
      break;
    case 'failure':
      page = <StripeVerificationFailure handleFail={handleFail} />;
      break;
    default:
      break;
  }
  return (
    <View style={{flex:1}}>
      <HeaderPadding alt to={'StripeAccountVerification'} />
      {page}
      <Text />
    </View>
  );
};

export default withNavigation(StripeIdentityVerificationView);

const styles = StyleSheet.create({});
