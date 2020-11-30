import React, {useCallback, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from 'react-navigation';
import {stripeDeleteExternalAccount} from '../../api/stripe_index';
import PaymentBankItem from '../../components/expandable-list-item/payment-bank-item/PaymentBankItem';
import TouchableNativeReplacement from '../../components/layout/TouchableNativeReplacement';
import {AuthContext} from '../../context/AuthContext';

const PaymentBanksList = ({account, navigation, refresh}) => {
  console.log('PAYMENT BANKS LIST =>', account);
  const authContext = useContext(AuthContext);

  const deleteBank = useCallback(
    async bank_id => {
      try {
        const {user_id, user_data} = authContext;
        console.log(
          'DELETING BANK => ',
          user_id,
          user_data.stripe_account_id,
          bank_id,
        );
        await stripeDeleteExternalAccount(
          user_id,
          user_data.stripe_account_id,
          bank_id,
        );
        refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [authContext, refresh],
  );

  let banksList = [];
  if (!account) {
    return (
      <TouchableNativeReplacement
        color={'secondary'}
        onPress={() => navigation.navigate('StripeAccountVerification')}>
        <View style={styles.item}>
          <View style={styles.rowdisabled}>
            <View style={styles.col}>
              <Icon style={styles.itemicon} name={'times-circle'} size={20} />
            </View>
            <View style={styles.col}>
              <Text style={styles.itemtext}>{'No Bank Added'}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeReplacement>
    );
  }

  if (account.external_accounts) {
    console.log('EXTERNAL ACCOUNTS =>', account.external_accounts);
    banksList = account.external_accounts.data.map((item, i) => {
      const {id, bank_name, last4} = item;
      return (
        <PaymentBankItem
          key={i}
          bank_id={id}
          handleBankDelete={() => deleteBank(id)}
          bank_name={bank_name}
          last_4_digits={last4}
        />
      );
    });

    if (banksList.length <= 0) {
      banksList = (
        <TouchableNativeReplacement color={'secondary'} onPress={() => {}}>
          <View style={styles.item}>
            <View style={styles.rowdisabled}>
              <View style={styles.col}>
                <Icon style={styles.itemicon} name={'times-circle'} size={20} />
              </View>
              <View style={styles.col}>
                <Text style={styles.itemtext}>{'No Bank Added'}</Text>
              </View>
            </View>
          </View>
        </TouchableNativeReplacement>
      );
    }
  }

  return (
    <React.Fragment>
      {banksList}
      <TouchableNativeReplacement
        color={'primary'}
        onPress={() => navigation.navigate('StripeAccountVerification')}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Icon style={styles.itemicon} name={'plus-circle'} size={20} />
            <Text style={styles.itemtext}>{'Add Bank Account'}</Text>
          </View>
        </View>
      </TouchableNativeReplacement>
    </React.Fragment>
  );
};

export default withNavigation(PaymentBanksList);

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  rowdisabled: {
    flexDirection: 'row',
    opacity: 0.3,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  itemsubtext: {
    fontFamily: 'Montserrat-Medium',
    color: '#777',
    fontSize: 13,
  },
  itemicon: {
    paddingHorizontal: 20,
  },
});
