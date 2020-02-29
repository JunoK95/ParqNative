import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import stripe from 'tipsi-stripe';
import testID from '../../components/tipsi/utils/testID';
import {ListItem} from 'react-native-elements';
import Axios from 'axios';

stripe.setOptions({
  publishableKey: 'pk_test_2a0X0i2dhIxdgSaLw9HxWrOP00mE8JnGY9',
});

export default class CardFormScreen extends PureComponent {
  static title = 'Card Form';
  state = {
    loading: false,
    token: null,
  };

  handleCardPayPress = async () => {
    try {
      const {stripe_id} = this.props;
      this.setState({loading: true, token: null});
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        prefilledInformation: {
          billingAddress: {
            ...this.props.billingAddress,
            // name: 'Gunilla Haugeh',
            // line1: 'Canary Place',
            // line2: '3',
            // city: 'Macon',
            // state: 'Georgia',
            // country: 'US',
            // postalCode: '31217',
            // email: 'ghaugeh0@printfriendly.com',
          },
        },
      });
      if (token && stripe_id) {

        const newcard = await Axios({
          method: 'POST',
          url:
            'https://us-central1-parq-dev.cloudfunctions.net/stripeCreateCard',
          data: {
            customer_id: stripe_id,
            cardToken: token.tokenId,
          },
        });
        console.log('new card created => ', newcard);
      }
      this.setState({loading: false, token});
    } catch (error) {
      this.setState({loading: false});
    }
  };

  render() {
    const {loading, token} = this.state;

    return (
      <View style={styles.container}>
        <ListItem
          title={'Add Card'}
          leftIcon={{name: 'add', color: '#000'}}
          onPress={this.handleCardPayPress}
        />
        <View style={styles.token} {...testID('cardFormToken')}>
          {token && (
            <Text style={styles.instruction}>Token: {token.tokenId}</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});
