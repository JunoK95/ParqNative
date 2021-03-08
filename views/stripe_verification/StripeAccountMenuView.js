import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View} from 'react-native';
import HeaderPadding from '../../components/header-padding/HeaderPadding';
import {AuthContext} from '../../context/AuthContext';
import StripeVerificationMenu from './StripeVerificationMenu';
import {getWallet} from '../../firebase_func/walletFunctions';
import {withNavigationFocus} from 'react-navigation';
import {stripeGetAccountInfo} from '../../api/stripe_index';
import OrbLoading from '../../components/loading/OrbLoading';

const StripeAccountMenuView = props => {
  const context = useContext(AuthContext);
  const {isFocused} = props;
  const [error, seterror] = useState(null);
  const [loading, setLoading] = useState(true);
  const [account, setaccount] = useState(null);
  const [wallet, setwallet] = useState(null);

  const getAccountInfo = useCallback(async () => {
    seterror(null);
    setaccount(null);
    setLoading(true);
    let account_id;
    try {
      account_id = context.user_data.stripe_account_id;
    } catch {
      seterror('Could Not Get User Stripe Connect ID');
      console.log('Could not retrieve stripe_account_id');
    }

    let accountData;
    if (account_id) {
      console.log("ROLE =>", context.user_data.role);
      const response = await stripeGetAccountInfo(
        account_id,
        context.user_data.role,
      );
      if (response.error) {
        console.error('ERROR RETRIEVING CONNECT ACCOUNT INFO');
        seterror(response.error);
      } else {
        accountData = response;
      }
    } else {
      accountData = await context.functions.assignStripeAccount();
    }
    console.log(
      'Account Data Account Menu View => ',
      accountData.external_accounts,
    );
    const newWallet = await getWallet(context.user_id);
    setwallet(newWallet);
    setaccount(accountData);
  }, [context.functions, context.user_data.stripe_account_id, context.user_id]);

  useEffect(() => {
    getAccountInfo();
  }, [isFocused, getAccountInfo]);

  useEffect(() => {
    if (account || error) {
      setLoading(false);
    }
  }, [account, error]);

  if (loading) {
    return <OrbLoading bgcolor={'#ffc630'} />;
  }

  return (
    <View style={{flex: 1}}>
      <HeaderPadding to={'PaymentSetting'} alt />
      <StripeVerificationMenu wallet={wallet} account={account} />
    </View>
  );
};

export default withNavigationFocus(StripeAccountMenuView);
