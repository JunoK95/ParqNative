import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableNativeReplacement from '../../components/layout/TouchableNativeReplacement';

const requirementList = [
  // 'external_account',
  'individual.first_name',
  'individual.last_name',
  'tos_acceptance.date',
  'tos_acceptance.ip',
  'individual.dob.day',
  'individual.dob.month',
  'individual.dob.year',
  'individual.ssn_last_4',
];

const StripeVerificationMenu = props => {
  const {setprogress, account} = props;
  const {requirements, charges_enabled, payouts_enabled} = account;
  console.log('REQUIREMENTS Currently Due => ', requirements.currently_due);
  let identityVerified = true;
  let externalAccount = true;

  requirements.currently_due.forEach(element => {
    if (element === 'external_account') {
      externalAccount = false;
    }
    if (requirementList.includes(element)) {
      identityVerified = false;
    }
  });

  return (
    <View>
      {identityVerified ? (
        <TouchableNativeReplacement color={'secondary'} onPress={() => {}}>
          <View style={styles.item}>
            <View style={styles.row}>
              <FontAwesome5Icon
                style={styles.itemicon}
                name={'id-card-alt'}
                size={20}
              />
              <Text style={styles.itemtext}>{'Identity Verified'}</Text>
              <FontAwesome5Icon
                style={styles.itemicon}
                name={'check-circle'}
                size={20}
                color={'green'}
              />
            </View>
          </View>
        </TouchableNativeReplacement>
      ) : (
        <TouchableNativeReplacement
          color={'secondary'}
          onPress={() => setprogress(1)}>
          <View style={styles.item}>
            <View style={styles.row}>
              <FontAwesome5Icon
                style={styles.itemicon}
                name={'id-card-alt'}
                size={20}
              />
              <Text style={styles.itemtext}>{'Identity Verification'}</Text>
              <FontAwesome5Icon
                style={styles.itemicon}
                name={'times-circle'}
                size={20}
                color={'red'}
              />
            </View>
          </View>
        </TouchableNativeReplacement>
      )}
      <TouchableNativeReplacement
        color={'secondary'}
        onPress={() => setprogress(2)}>
        <View style={styles.item}>
          <View style={styles.row}>
            <FontAwesome5Icon
              style={styles.itemicon}
              name={'university'}
              size={20}
            />
            <Text style={styles.itemtext}>{'Attach Bank Account'}</Text>
            {account.external_accounts.total_count > 0 ? (
              <FontAwesome5Icon
                style={styles.itemicon}
                name={'check-circle'}
                size={20}
                color={'green'}
              />
            ) : (
              <FontAwesome5Icon
                style={styles.itemicon}
                name={'times-circle'}
                size={20}
                color={'red'}
              />
            )}
          </View>
        </View>
      </TouchableNativeReplacement>
      <Text style={styles.infoText}>
        To start hosting you need to verify your account with stripe and then
        add a bank account where Parq can payout to.
      </Text>
    </View>
  );
};

export default StripeVerificationMenu;

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  itemicon: {
    paddingHorizontal: 20,
  },
  infoText: {
    paddingHorizontal: 48,
    paddingVertical: 32,
    textAlign: 'center',
  },
});
