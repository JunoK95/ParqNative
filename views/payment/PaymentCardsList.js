import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import CardFormScreen from './CardFormScreen';
import CreditCardItem from './CreditCardItem';

const PaymentCardsList = props => {
  const {cards, billing_address, stripe_id} = props;

  let cardList = [];
  if (cards) {
    cardList = cards.map((c, i) => {
      return <CreditCardItem key={i} card={c} />;
    });
  } else {
    cardList = <CreditCardItem />;
  }

  return (
    <View>
      {cardList ? cardList : <ActivityIndicator />}
      {/* <CardFormScreen stripe_id={stripe_id} billing_address={billing_address} /> */}
    </View>
  );
};

export default PaymentCardsList;
