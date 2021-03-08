import moment from 'moment';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { NavigationScreenProp, withNavigation, withNavigationFocus } from 'react-navigation';
import { stripeGetAccountInfo, stripeGetPayout, stripeRetrieveUserBalance } from '../api/stripe_index';
import RoundedButtonTSX from '../components/button/RoundedButtonTSX';
import HeaderPadding from '../components/header-padding/HeaderPadding';
import ListItemDuo from '../components/list-item-duo/ListItemDuo';
import OrbLoading from '../components/loading/OrbLoading';
import BalanceCard from '../components/payout-card/BalanceCard';
import PayoutCard from '../components/payout-card/PayoutCard';
import TitledList from '../components/titled-list/TitledList';
import { AuthContext } from '../context/AuthContext';
import { convertToDollar } from '../helpers/helper';

interface PayoutViewProps {
  navigation: NavigationScreenProp<any,any>,
  isFocused: boolean,
}

interface DataFormat {
  has_more: boolean,
  data: Array<any>,
  fetching: boolean,
}

interface BalanceObject {
  available: Array<any>,
  instant_available: Array<any>,
  livemode: boolean,
  object: string,
  pending: Array<any>,
}

interface BalanceType {
  data: BalanceObject,
  fetching: boolean,
}

interface AccountObject {
  data: any,
  fetching: boolean,
}

const PayoutView: React.FC<PayoutViewProps> = ({isFocused}) => {
  const authContext = useContext(AuthContext);
  const {user_data, user_id} = authContext;
  const [error, setError] = useState<string>();
  const [account, setAccount] = useState<AccountObject>({
    data: {
      external_accounts: [],
    },
    fetching: true,
  });
  const [balance, setBalance] = useState<BalanceType>({
    data: {    
      available: [],
      instant_available: [],
      livemode: false,
      object: 'balance',
      pending: [],
    },
    fetching: true,
  })

  const [payouts, setPayouts] = useState<DataFormat>({
    has_more: true,
    data: [],
    fetching: true,
  });

  const fetchBalance = useCallback(
    async () => {
      setBalance({...balance, fetching: true});
      try {
        const balanceResponse = await stripeRetrieveUserBalance(
          user_id,
          user_data.stripe_account_id,
        );
        console.log('BALANCE INFO =>', balanceResponse)
        setBalance({data: balanceResponse, fetching: false});
      } catch (error) {
        console.error('ERROR RETRIEVING BALANCE INFO');
        setBalance({...balance, fetching: false})
        setError('ERROR RETRIEVING BALANCE INFO');
      }
      return;
    },
    [balance],
  )

  const fetchAccount = useCallback(
    async () => {
      setAccount({...account, fetching: true});
      try {
        const accountResponse = await stripeGetAccountInfo(
          user_data.stripe_account_id, 
          user_data.role
        );
        console.log('ACCOUNT INFO =>', accountResponse);
        setAccount({data: accountResponse, fetching: false});
        return;
      } catch (error) {
        console.error('ERROR RETRIEVING ACCOUNT INFO');
        setAccount({...account, fetching: false});
        setError('ERROR RETRIEVING ACCOUNT INFO');
        return;
      }
    },
    [account]
  );

  const fetchPayouts = useCallback(
    async () => {
      setPayouts({...payouts, fetching: true});
      let after : string | null;
      if (payouts.data.length > 0) {
        after = payouts.data[payouts.data.length - 1].id;
      }
      try {
        const PayoutResponse = 
          await stripeGetPayout(
            user_id, 
            user_data.stripe_account_id,
            '',
            after,
          );
        console.log('GETTING PAYOUT =>', PayoutResponse.data);
        setPayouts({has_more: PayoutResponse.has_more, data: [...payouts.data, ...PayoutResponse.data], fetching: false});
        return;
      } catch (error) {
        console.error('ERROR RETRIEVING PAYOUT INFO', error);
        setPayouts({...payouts, fetching: false});
        setError('ERROR RETRIEVING PAYOUTS');
      }
    },
    [payouts],
  );

  useEffect(() => {
    fetchBalance();
    fetchAccount();
    if (payouts.data.length === 0) {
      fetchPayouts();
    }
    return () => {
      setPayouts({
        has_more: true,
        data: [],
        fetching: false,
      })
    }
  }, [isFocused])

  if (balance.fetching || account.fetching || payouts.fetching) {
    console.log('IS LOADING')
    return (
      <ScrollView>
        <HeaderPadding title={'Payouts'} alt to={'Home'} />
        <View style={styles.screen}>
          <OrbLoading bgcolor={'transparent'} />
        </View>
      </ScrollView>
    )
  }
  else {
    let bankList = account.data.external_accounts.data.map((item, i) => {
      return (      
        <ListItemDuo 
          key={i}
          leftIcon={'university'}
          leftIconColor={'black'}
          title={item.bank_name}
          subtitle={`.... ${item.last4}`}
          rightIcon={item.default_for_currency ? 'check-circle': null}
        />
      )
    })

    let bankLast4;
    if (account.data.external_accounts.data.length > 0) {
      const defaultBank = account.data.external_accounts.data.filter(item => {
        return item.default_for_currency;
      });
      bankLast4 = defaultBank[0].last4;
    }

    let payoutList = payouts.data.map((item, i) => {
      const dollar = convertToDollar(item.amount / 100);
      return ( 
        <ListItemDuo
          key={i} 
          leftIcon={'tag'} 
          leftIconColor={'black'}
          title={`${moment(item.arrival_date, 'X').format('MMMM DD, YYYY')}`}
          subtitle={`status: ${item.status.toUpperCase()}`}
          rightText={`+$${dollar}`}
          rightColor={'#5DBB63'}
        />
      );
    })

    return (
      <View>
        <HeaderPadding title={'Payouts'} alt to={'Home'} />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.cardContainer}>
            <BalanceCard
              amount={balance.data.instant_available[0].amount}
              title={'Your Balance'}
              bank_last4={bankLast4}
              bottomLinkText={'Go To Payout'}
              backgroundColor={'white'} 
            />
          </View>
          <TitledList title={'BANKS'}>
            {bankList}
            <ListItemDuo leftIcon={'plus-circle'} title={'Add Bank Account'} />
          </TitledList>
          <TitledList title={'PAYOUTS'}>
            {payoutList}
          </TitledList>
          <RoundedButtonTSX 
            title={payouts.has_more ? 'Load More Items' : 'End of List'}
            disabled={!payouts.has_more}
            textColor={'#11A4FF'}
            fontSize={16}
            onPress={() => fetchPayouts()}
          />
        </ScrollView>
      </View>
    );
  };
}

export default withNavigationFocus(PayoutView);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    paddingBottom: 144,
  },
  container: {
    paddingBottom: 144,
  },
  cardContainer: {
    paddingVertical: 32,
    paddingTop: 48,
    paddingHorizontal: 48,
  },
});
