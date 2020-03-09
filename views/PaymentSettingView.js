import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import {AuthContext} from '../context/AuthContext';
import PaymentCardsList from './payment/PaymentCardsList';
import WalletDisplay from './payment/WalletDisplay';
import {getWallet} from '../firebase_func/walletFunctions';
import {Icon} from 'react-native-elements';
import PaymentBanksList from './payment/PaymentBanksList';

const PaymentSettingView = () => {
  const context = useContext(AuthContext);
  const {user_data, user_id} = context;
  const [fetch, setfetch] = useState(true);
  const [cards, setcards] = useState(null);
  const [banks, setbanks] = useState(null);
  const [wallet, setwallet] = useState(null);

  const fetchData = useCallback(async () => {
    const {billing_address, stripe_customer_id} = user_data;
    setfetch(true);
    if (!stripe_customer_id) {
      context.functions.assignStripeId();
    } else {
      await context.functions
        .getStripePaymentMethods(stripe_customer_id)
        .then(res => {
          setcards(res);
        });
      await context.functions.getStripeBanks(stripe_customer_id).then(res => {
        setbanks(res);
      });
    }
    const newWallet = await getWallet(user_id).then(res => {
      return res;
    });
    setwallet(newWallet);
    setfetch(false);
  }, [user_data, user_id, context.functions]);

  useEffect(() => {
    setfetch(true);
    fetchData();
  }, [fetchData]);

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

  if (!user_data) {
    return null;
  } else {
    const {billing_address, stripe_customer_id} = user_data;
    return (
      <ScrollView>
        <HeaderPadding to={'Home'} alt title={'Wallet'} right={refreshbutton} />
        {wallet && <WalletDisplay user_id={context.user_id} wallet={wallet} />}
        <PaymentCardsList
          cards={cards}
          stripe_id={stripe_customer_id}
          billing_address={billing_address}
        />
        <PaymentBanksList />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankcard: {
    width: Dimensions.get('window').width - 48,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PaymentSettingView;
