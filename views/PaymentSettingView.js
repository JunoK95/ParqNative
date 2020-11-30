import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import HeaderPadding from '../components/header-padding/HeaderPadding';
import {AuthContext} from '../context/AuthContext';
import PaymentCardsList from './payment/PaymentCardsList';
import WalletDisplay from './payment/WalletDisplay';
import {getWallet} from '../firebase_func/walletFunctions';
import {Icon} from 'react-native-elements';
import PaymentBanksList from './payment/PaymentBanksList';
import {stripeGetAccountInfo} from '../api/stripe_index';
import CustomListItem from '../components/layout/CustomListItem';
import CardTokenGenerator from './payment/card-token-generator/CardTokenGenerator';
import OrbLoading from '../components/loading/OrbLoading';
import ReferralCodeGenerator from '../components/referral/referral-code-generator/ReferralCodeGenerator';

const PaymentSettingView = () => {
  const context = useContext(AuthContext);
  const {user_data, user_id} = context;
  const [fetch, setfetch] = useState(true);
  const [cards, setcards] = useState(null);
  const [account, setaccount] = useState(null);
  const [banks, setbanks] = useState(null);
  const [wallet, setwallet] = useState(null);
  const [OpenGen, setOpenGen] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user_data) {
      console.log('User Data not found');
      return;
    }
    const {stripe_customer_id} = user_data;
    setfetch(true);
    if (!stripe_customer_id) {
      context.functions.assignStripeCustomerId(user_data);
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
      const response = await stripeGetAccountInfo(
        account_id,
        context.user_data.role,
      );
      if (response.error) {
        console.error('ERROR RETRIEVING CONNECT ACCOUNT INFO');
      } else {
        accountData = response.data;
      }
    }
    setaccount(accountData);
    // const newWallet = await getWallet(user_id).then(res => {
    //   return res;
    // });
    // setwallet(newWallet);
    setfetch(false);
  }, [
    context.functions,
    context.user_data.role,
    context.user_data.stripe_account_id,
    user_data,
  ]);

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
      <ScrollView>
        <HeaderPadding to={'Home'} alt title={'Wallet'} right={refreshbutton} />
        <View style={styles.screen}>
          <OrbLoading bgColor={'transparent'} />
        </View>
      </ScrollView>
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
        <CustomListItem
          title={'Add Payment Card'}
          icon={'plus-circle'}
          iconSize={20}
          handlePress={() => setOpenGen(!OpenGen)}
        />
        <CardTokenGenerator open={OpenGen} setopen={setOpenGen} />
        <View style={styles.padding} />
        <PaymentBanksList account={account} />
        {process.env.NODE_ENV === 'development' ? (
          <ReferralCodeGenerator />
        ) : null}
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
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    height: Dimensions.get('window').height - 240,
  },
});

export default PaymentSettingView;
