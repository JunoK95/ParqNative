import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View, Picker, ActivityIndicator} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

const PaymentPicker = props => {
  const [select, setselect] = useState(null);
  const [cards, setcards] = useState(null);
  const [wallet, setwallet] = useState(null);
  const {setselectcard} = props;
  const context = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      if (!context.user_data.stripe_customer_id) {
        await context.functions.assignStripeId();
      } else {
        const payments = await context.functions
          .getAllPaymentMethods()
          .then(res => {
            return res;
          });
        if (props.includeWallet) {
          setselect(payments.wallet);
          setselectcard(payments.wallet);
          setwallet(payments.wallet);
        }
        if (payments.cards.length > 0) {
          setcards(payments.cards);
          setselect(payments.cards[0]);
          setselectcard(payments.cards[0]);
          setwallet(payments.wallet);
        } else {
          setselect(payments.wallet);
          setselectcard(payments.wallet);
          setwallet(payments.wallet);
        }
      }
    }

    fetchData();
  }, [
    context.user_data,
    context.functions,
    setselectcard,
    props.includeWallet,
  ]);

  let pickerItems;
  if (cards) {
    pickerItems = cards.map((c, i) => {
      return (
        <Picker.Item key={i} label={'💳 ' + ' **** ' + c.last4} value={c} />
      );
    });
  }

  return (
    <View>
      <Text style={styles.pickerLabel}>Payment Method</Text>
      {cards && wallet ? (
        <Picker
          style={styles.picker}
          selectedValue={select}
          onValueChange={(itemValue, itemIndex) => {
            setselect(itemValue);
            setselectcard(itemValue);
          }}>
          {props.includeWallet && (
            <Picker.Item
              label={'💰 ' + wallet.credit + ' coins'}
              value={wallet}
            />
          )}
          {pickerItems}
        </Picker>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginHorizontal: 24,
    minWidth: 260,
  },
  pickerLabel: {
    marginHorizontal: 24,
    color: '#555',
  },
});

export default PaymentPicker;
