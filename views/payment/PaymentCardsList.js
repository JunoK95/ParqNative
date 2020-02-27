import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {ListItem} from 'react-native-elements';
import CardFormScreen from './CardFormScreen';

const PaymentCardsList = props => {
  const {cards, billing_address} = props;
  const [open, setopen] = useState(false);

  let cardList;
  if (cards) {
    cardList = cards.map((c, i) => {
      return (
        <ListItem
          key={i}
          title={c.last4}
          onPress={() => console.log('card info', c)}
          leftIcon={{name: 'credit-card', color: '#000'}}
        />
      );
    });
  }

  return (
    <View>
      {cardList ? cardList : <ActivityIndicator />}
      <CardFormScreen billing_address={billing_address} />
    </View>
  );
};

export default PaymentCardsList;
