import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import CardFormScreen from './CardFormScreen';
import CreditCardItem from './CreditCardItem';
import {ListItem} from 'react-native-elements';

const PaymentCardsList = props => {
  const {cards, billing_address, stripe_id} = props;

  let cardList;
  if (cards) {
    cardList = cards.map((c, i) => {
      return <CreditCardItem key={i} card={c} />;
    });
  }

  return (
    <View>
      {cardList ? cardList : <ActivityIndicator />}
      <CardFormScreen stripe_id={stripe_id} billing_address={billing_address} />
    </View>
  );
};

export default PaymentCardsList;
