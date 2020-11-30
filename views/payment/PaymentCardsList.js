import React, {useCallback, useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {stripeDeleteCard} from '../../api/stripe_index';
import {AuthContext} from '../../context/AuthContext';
import CardFormScreen from './CardFormScreen';
import CreditCardItem from './CreditCardItem';

const PaymentCardsList = ({cards, refresh}) => {
  const authContext = useContext(AuthContext);
  const handleCardDelete = useCallback(
    async card_id => {
      try {
        const {user_id, user_data} = authContext;
        console.log(
          'DELETING CARD => ',
          user_id,
          user_data.stripe_customer_id,
          card_id,
        );
        await stripeDeleteCard(user_id, user_data.stripe_customer_id, card_id);
        refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [authContext, refresh],
  );

  let cardList = [];
  if (cards) {
    cardList = cards.map((c, i) => {
      return (
        <CreditCardItem
          key={i}
          card={c}
          handleCardDelete={() => handleCardDelete(c.id)}
        />
      );
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
