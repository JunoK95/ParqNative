import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const StripeVerificationMenu = props => {
  const {setprogress, wallet, account} = props;
  return (
    <View>
      {wallet.stripe_account_verified ? (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#ffecb9')}
          onPress={() => {}}>
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
        </TouchableNativeFeedback>
      ) : (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#ffecb9')}
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
        </TouchableNativeFeedback>
      )}

      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#ffecb9')}
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
      </TouchableNativeFeedback>
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
});
