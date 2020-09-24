import React, {useCallback, useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderPadding from '../../components/header-padding/HeaderPadding';
import StripeAddBankForm from './StripeAddBankForm';
import {AuthContext} from '../../context/AuthContext';
import {stripeAddExternalAccount} from '../../api/stripe_index';
import OrbLoading from '../../components/loading/OrbLoading';

const StripeAddBankView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const context = useContext(AuthContext);
  const handleBankToken = useCallback(
    async bankToken => {
      setError(null);
      console.log('BANK TOKEN =>', bankToken);
      const {user_data} = context;
      try {
        const connect_id = user_data.stripe_account_id;
        const response = await stripeAddExternalAccount(connect_id, bankToken);
        if (response.error) {
          setLoading(false);
          console.log('ERROR ADDING EXTERNAL ACCOUNT => ', response.error);
          setError(response.error);
        } else {
          setLoading(false);
        }
      } catch (e) {
        setError(
          'We could not add your bank account, please make sure the information is correct!',
        );
      }
    },
    [context],
  );

  if (loading) {
    return <OrbLoading />;
  }
  return (
    <View>
      <HeaderPadding alt to={'StripeAccountVerification'} title={'Add Bank'} />
      <StripeAddBankForm handleBankToken={handleBankToken} error={error} />
    </View>
  );
};

export default StripeAddBankView;

const styles = StyleSheet.create({});
