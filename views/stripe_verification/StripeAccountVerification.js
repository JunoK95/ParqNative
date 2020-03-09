import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StripeActivate0 from './StripeActivate0';
import HeaderPadding from '../../components/layout/HeaderPadding';
import Axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import StripeActivateForm1 from './StripeActivateForm1';

const StripeAccountVerification = () => {
  const context = useContext(AuthContext);
  const [progress, setprogress] = useState(0);
  const [account, setaccount] = useState(null);

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
        accountData = await Axios({
          method: 'POST',
          url:
            'https://us-central1-parq-dev.cloudfunctions.net/stripeGetAccount',
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
    };

    getAccountInfo();
  }, [context.functions, context.user_data.stripe_account_id]);

  if (account) {
    console.log('Account Requirements => ', account.requirements);
  }

  let content;
  switch (progress) {
    case 0:
      content = <StripeActivateForm1 />;
      break;
    default:
      break;
  }

  return (
    <View>
      <HeaderPadding to={'PaymentSetting'} alt />
      {content}
    </View>
  );
};

export default StripeAccountVerification;
