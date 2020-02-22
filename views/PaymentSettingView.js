import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import {AuthContext} from '../context/AuthContext';
import PaymentCardsList from './payment/PaymentCardsList';
import WalletDisplay from './payment/WalletDisplay';
import {ListItem} from 'react-native-elements';

const PaymentSettingView = () => {
  const context = useContext(AuthContext);
  const {billing_address} = context.user_data;
  const [cards, setcards] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!context.user_data.stripe_customer_id) {
        await context.functions.assignStripeId();
      } else {
        context.functions
          .getStripePaymentMethods(context.user_data.stripe_customer_id)
          .then(res => {
            setcards(res);
          });
      }
    }

    fetchData();
  }, [context.user_data, context.functions]);

  return (
    <View>
      <HeaderPadding to={'Home'} alt />
      <WalletDisplay user_id={context.user_id} />
      <PaymentCardsList cards={cards} />
      {billing_address && (
        <ListItem
          title={'Add Billing Address'}
          leftIcon={{name: 'add', color: '#000'}}
          onPress={() => console.log('Add Balance')}
        />
      )}
    </View>
  );
};

export default PaymentSettingView;
