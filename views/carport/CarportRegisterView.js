import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import HeaderPadding from '../../components/header-padding/HeaderPadding';
import AddressSubmissionForm from './AddressSubmissionForm';
import {AuthContext} from '../../context/AuthContext';
import {withNavigationFocus} from 'react-navigation';
import {stripeGetAccountInfo} from '../../api/stripe_index';

const CarportRegisterView = props => {
  const context = useContext(AuthContext);
  const {isFocused} = props;
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
        const response = await stripeGetAccountInfo(
          account_id,
          context.user_data.role,
        );
        if (response.error) {
          console.error('ERROR RETRIEVING CONNECT ACCOUNT INFO');
        } else {
          accountData = response.data;
        }
      } else {
        console.log('No Account Data');
      }
      setaccount(accountData);
    };

    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={styles.screen}>
      <HeaderPadding to={'CarportList'} />
      {account ? (
        <View style={styles.screen}>
          {account.charges_enabled ? (
            <AddressSubmissionForm />
          ) : (
            <TouchableHighlight
              onPress={() =>
                props.navigation.navigate('StripeAccountVerification')
              }
              style={styles.container}
              underlayColor={'#c2e8ff'}>
              <Text style={styles.text}>
                You need to be verified to become a host. Click here to get
                started!
              </Text>
            </TouchableHighlight>
          )}
        </View>
      ) : (
        <View style={styles.screen}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formcontainer: {
    paddingBottom: 12,
    paddingVertical: 24,
  },
  container: {
    width: Dimensions.get('window').width - 48,
    paddingVertical: 12,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontFamily: 'Montserrat-MediumItalic',
    textAlign: 'center',
    paddingHorizontal: 36,
  },
});

export default withNavigationFocus(CarportRegisterView);
