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
import Axios from 'axios';

const PaymentSettingView = () => {
  const context = useContext(AuthContext);
  const {user_data, user_id} = context;
  const [fetch, setfetch] = useState(true);
  const [cards, setcards] = useState(null);
  const [account, setaccount] = useState(null);
  const [banks, setbanks] = useState(null);
  const [wallet, setwallet] = useState(null);

  const fetchData = useCallback(async () => {
    if (!user_data) {
      console.log('User Data not found');
      return;
    }
    const {stripe_customer_id} = user_data;
    setfetch(true);
    if (!stripe_customer_id) {
      context.functions.assignStripeId();
    } else {
      await context.functions
        .getStripePaymentMethods(stripe_customer_id)
        .then(res => {
          setcards(res);
        });
    }

    let account_id;
    try {
      account_id = context.user_data.stripe_account_id;
    } catch {
      console.log('Could not retrieve stripe_account_id');
    }

    let accountData;
    if (account_id) {
      accountData = await Axios({
        method: 'POST',
        url: 'https://us-central1-parq-dev.cloudfunctions.net/stripeGetAccount',
        data: {
          account_id: account_id,
        },
      }).then(res => {
        console.log(res.data);
        return res.data;
      });
    } else {
      accountData = await context.functions.assignStripeAccount();
    }
    console.log('Account Data => ', accountData);
    setaccount(accountData);
    // const newWallet = await getWallet(user_id).then(res => {
    //   return res;
    // });
    // setwallet(newWallet);
    setfetch(false);
  }, []);

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
        {/* {wallet && <WalletDisplay user_id={context.user_id} wallet={wallet} />} */}
        <PaymentCardsList
          cards={cards}
          stripe_id={stripe_customer_id}
          billing_address={billing_address}
        />
        <View style={styles.padding} />
        <PaymentBanksList account={account} />
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
  padding: {
    padding: 8,
  }
});

export default PaymentSettingView;
