import React, {useEffect, useState, useContext, useCallback} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import {AuthContext} from '../context/AuthContext';
import PaymentCardsList from './payment/PaymentCardsList';
import WalletDisplay from './payment/WalletDisplay';
import {ListItem} from 'react-native-elements';
import {getWallet} from '../firebase_func/walletFunctions';
import {Icon} from 'react-native-elements';

const PaymentSettingView = () => {
  const context = useContext(AuthContext);
  const {billing_address} = context.user_data;
  const [fetch, setfetch] = useState(true);
  const [cards, setcards] = useState(null);
  const [wallet, setwallet] = useState(null);

  const fetchData = useCallback(async () => {
    setfetch(true);
    if (!context.user_data.stripe_customer_id) {
      context.functions.assignStripeId();
    } else {
      await context.functions
        .getStripePaymentMethods(context.user_data.stripe_customer_id)
        .then(res => {
          setcards(res);
        });
    }
    const newWallet = await getWallet(context.user_id).then(res => {
      return res;
    });
    setwallet(newWallet);
    setfetch(false);
  }, [
    context.functions,
    context.user_data.stripe_customer_id,
    context.user_id,
  ]);

  useEffect(() => {
    setfetch(true);
    fetchData();
  }, [context.user_data, context.functions, fetchData]);

  const refreshbutton = (
    <TouchableOpacity onPress={() => fetchData()}>
      <Icon name={'refresh'} size={30} />
    </TouchableOpacity>
  );

  if (fetch) {
    return (
      <View>
        <HeaderPadding to={'Home'} alt title={'Wallet'} right={refreshbutton} />
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <HeaderPadding to={'Home'} alt title={'Wallet'} right={refreshbutton} />
      {wallet && <WalletDisplay user_id={context.user_id} wallet={wallet} />}
      <PaymentCardsList cards={cards} billing_address={billing_address} />
      {!billing_address || billing_address === {} ? (
        <ListItem
          title={'Add Billing Address'}
          leftIcon={{name: 'add', color: '#000'}}
          onPress={() => console.log('Billing Address')}
        />
      ) : (
        <ListItem
          title={'Edit Billing Address'}
          leftIcon={{name: 'add', color: '#000'}}
          onPress={() => console.log('Billing Address')}
        />
      )}
    </View>
  );
};

export default PaymentSettingView;
