import React, {useCallback, useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderPadding from '../../components/header-padding/HeaderPadding';
import StripeAddBankForm from './StripeAddBankForm';
import {AuthContext} from '../../context/AuthContext';
import {stripeAddExternalAccount} from '../../api/stripe_index';
import OrbLoading from '../../components/loading/OrbLoading';
import {withNavigation} from 'react-navigation';

const StripeAddBankView = props => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const context = useContext(AuthContext);

  const handleBankToken = useCallback(
    async bankToken => {
      setLoading(true);
      setError(null);
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
          props.navigation.navigate('StripeAccountVerification');
        }
      } catch (e) {
        setError(
          'We could not add your bank account, please make sure the information is correct!',
        );
      }
    },
    [context, props.navigation],
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

export default withNavigation(StripeAddBankView);

const styles = StyleSheet.create({});
