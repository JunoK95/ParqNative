import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from 'react-navigation';
import TouchableNativeReplacement from '../../components/layout/TouchableNativeReplacement';

const PaymentBanksList = props => {
  const {account} = props;

  let banksList = [];
  if (!account) {
    return (
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

  if (account.external_accounts) {
    banksList = account.external_accounts.data.map((item, i) => {
      const {bank_name, last4} = item;
      return (
        <TouchableNativeReplacement
          key={i}
          color={'secondary'}
          onPress={() => {}}>
          <View style={styles.item}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Icon style={styles.itemicon} name={'university'} size={20} />
              </View>
              <View style={styles.col}>
                <Text style={styles.itemtext}>{bank_name}</Text>
                <Text style={styles.itemsubtext}>{'... ' + last4}</Text>
              </View>
            </View>
          </View>
        </TouchableNativeReplacement>
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
        onPress={() => props.navigation.navigate('StripeAccountVerification')}>
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
