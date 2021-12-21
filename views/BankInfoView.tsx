import moment from 'moment';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions} from 'react-native';
import {NavigationScreenProp, withNavigationFocus} from 'react-navigation';
import {
  stripeGetPayout,
  stripeUpdateDefaultBankAccount,
} from '../api/stripe_index';
import RoundedButtonTSX from '../components/button/RoundedButtonTSX';
import HeaderPadding from '../components/header-padding';
import ListItemDuo from '../components/list-item-duo/ListItemDuo';
import {OrbLoading} from '../components/loading';
import TitledList from '../components/titled-list/TitledList';
import {AuthContext} from '../context/AuthContext';
import {convertToDollar} from '../helpers/helper';

interface BankInfoViewProps {
  navigation: NavigationScreenProp<any, any>;
  isFocused: boolean;
}

interface PayoutFormat {
  has_more: boolean;
  data: Array<any>;
  fetching: boolean;
}

const BankInfoView: React.FC<BankInfoViewProps> = ({navigation, isFocused}) => {
  const {bank} = navigation.state.params;
  const authContext = useContext(AuthContext);
  const {user_id, user_data} = authContext;
  console.log('BANK INFO =>', bank);
  const [payouts, setPayouts] = useState<PayoutFormat>({
    has_more: true,
    data: [],
    fetching: true,
  });
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const fetchPayouts = useCallback(async () => {
    setPayouts({...payouts, fetching: true});
    let after: string | null = null;
    if (payouts.data.length > 0) {
      after = payouts.data[payouts.data.length - 1].id;
    }
    try {
      const PayoutResponse = await stripeGetPayout(
        user_id,
        user_data.stripe_account_id,
        bank.id,
        after,
      );
      console.log('GETTING PAYOUT =>', PayoutResponse.data);
      setPayouts({
        has_more: PayoutResponse.has_more,
        data: [...payouts.data, ...PayoutResponse.data],
        fetching: false,
      });
      return;
    } catch (e) {
      console.error('ERROR RETRIEVING PAYOUT INFO', e);
      setPayouts({...payouts, fetching: false});
      setError('ERROR RETRIEVING PAYOUTS');
    }
  }, [payouts, user_id, user_data.stripe_account_id, bank.id]);

  const handleDefaultBankChange = async () => {
    setLoading(true);
    try {
      await stripeUpdateDefaultBankAccount(
        user_id,
        user_data.stripe_account_id,
        bank.id,
      );
      setLoading(false);
      navigation.navigate('Payout');
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (payouts.data.length === 0) {
      fetchPayouts();
    }
    return () => {
      setPayouts({
        has_more: true,
        data: [],
        fetching: true,
      });
    };
  }, [bank, isFocused]);

  if (payouts.fetching || loading) {
    console.log('IS LOADING');
    return (
      <ScrollView>
        <HeaderPadding title={'Payouts'} alt to={'Home'} />
        <View style={styles.screen}>
          <OrbLoading bgcolor={'transparent'} />
        </View>
      </ScrollView>
    );
  } else {
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
    });

    return (
      <View>
        <HeaderPadding title={bank.bank_name} alt to={'Payout'} />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.buttonContainer}>
            <RoundedButtonTSX
              title={
                bank.default_for_currency
                  ? 'Currently Default Payout Bank'
                  : 'Click To Set As Default Payout Bank'
              }
              textColor={'white'}
              backgroundColor={'#11A4FF'}
              disabled={bank.default_for_currency}
              fontSize={16}
              onPress={handleDefaultBankChange}
            />
          </View>
          <TitledList title={'PAYOUTS'}>{payoutList}</TitledList>
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
  }
};

export default withNavigationFocus(BankInfoView);

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
  buttonContainer: {
    padding: 32,
  },
});
