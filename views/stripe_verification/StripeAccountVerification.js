import React, {useState, useEffect, useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';
import {AuthContext} from '../../context/AuthContext';
import StripeActivateForm1 from './StripeActivateForm1';
import StripeVerificationMenu from './StripeVerificationMenu';
import StripeAddBankForm from './StripeAddBankForm';
import {getWallet} from '../../firebase_func/walletFunctions';
import {withNavigation} from 'react-navigation';
import {stripeGetAccountInfo} from '../../api/stripe_index';

const StripeAccountVerification = props => {
  const context = useContext(AuthContext);
  const {navigation} = props;
  const [refresh, setrefresh] = useState(false);
  const [error, seterror] = useState(null);
  const [progress, setprogress] = useState(0);
  const [account, setaccount] = useState(null);
  const [wallet, setwallet] = useState(null);

  useEffect(() => {
    const getAccountInfo = async () => {
      let account_id;
      try {
        account_id = context.user_data.stripe_account_id;
      } catch {
        console.log('Could not retrieve stripe_account_id');
      }

      let accountData;
      if (account_id) {
        const response = await stripeGetAccountInfo(account_id);
        if (response.error) {
          console.error('ERROR RETRIEVING CONNECT ACCOUNT INFO');
          seterror(response.error);
        } else {
          accountData = response.data;
        }
      } else {
        accountData = await context.functions.assignStripeAccount();
      }
      console.log('Account Data => ', accountData);
      const newWallet = await getWallet(context.user_id).then(res => {
        return res;
      });
      setwallet(newWallet);
      setaccount(accountData);
    };

    const focusListener = navigation.addListener('willFocus', getAccountInfo());

    return () => {
      focusListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.functions, refresh]);

  let content;
  if (account) {
    let requirements = [];
    try {
      requirements = account.requirements.eventually_due;
    } catch (err) {
      seterror(err);
      return;
    }
    switch (progress) {
      case 0:
        content = (
          <StripeVerificationMenu
            wallet={wallet}
            account={account}
            setprogress={setprogress}
          />
        );
        break;
      case 1:
        content = (
          <StripeActivateForm1
            account={account}
            refresh={refresh}
            setrefresh={setrefresh}
            setprogress={setprogress}
            context={context}
          />
        );
        break;
      case 2:
        content = (
          <StripeAddBankForm
            account={account}
            refresh={refresh}
            setrefresh={setrefresh}
            setprogress={setprogress}
            context={context}
          />
        );
        break;
      default:
        break;
    }
  } else {
    content = <ActivityIndicator />;
  }

  return (
    <View>
      <HeaderPadding to={'PaymentSetting'} alt />
      {content}
    </View>
  );
};

export default withNavigation(StripeAccountVerification);
