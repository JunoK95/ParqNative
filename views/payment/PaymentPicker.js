import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View, Picker, ActivityIndicator} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

const PaymentPicker = props => {
  const [select, setselect] = useState(null);
  const [cards, setcards] = useState(null);
  const [wallet, setwallet] = useState(null);
  const [fetch, setfetch] = useState(true);
  const {setselectcard, includeWallet} = props;
  const context = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      setfetch(true);
      if (!context.user_data) {
        setfetch(false);
        return;
      } else if (!context.user_data.stripe_customer_id) {
        await context.functions.assignStripeCustomerId();
        setfetch(false);
      } else {
        const payments = await context.functions
          .getAllPaymentMethods()
          .then(res => {
            return res;
          });

        if (payments.cards.length > 0) {
          setcards(payments.cards);
          setselect(payments.cards[0]);
          setselectcard(payments.cards[0]);
          setwallet(payments.wallet);
        } else {
          setwallet(payments.wallet);
          setselect(payments.wallet);
          setselectcard(payments.wallet);
        }
        setfetch(false);
      }
    }
    fetchData();
  }, [
    context.functions,
    context.user_data,
    setselectcard,
  ]);

  let pickerItems;
  if (cards) {
    pickerItems = cards.map((c, i) => {
      return (
        <Picker.Item key={i} label={'💳 ' + ' **** ' + c.last4} value={c} />
      );
    });
  }

  if (!fetch) {
    if (includeWallet) {
      return (
        <View>
          <Text style={styles.pickerLabel}>Payment Method</Text>
          <Picker
            style={styles.picker}
            selectedValue={select}
            onValueChange={(itemValue, itemIndex) => {
              setselect(itemValue);
              setselectcard(itemValue);
            }}>
            <Picker.Item label={`${wallet.credit} coins`} value={wallet} />
            {pickerItems}
          </Picker>
        </View>
      );
    } else if (!includeWallet) {
      return (
        <View>
          <Text style={styles.pickerLabel}>Payment Method</Text>
          <Picker
            style={styles.picker}
            selectedValue={select}
            onValueChange={(itemValue, itemIndex) => {
              setselect(itemValue);
              setselectcard(itemValue);
            }}>
            {pickerItems}
          </Picker>
        </View>
      );
    }
  } else {
    return (
      <View>
        <Text style={styles.pickerLabel}>Payment Method</Text>
        <ActivityIndicator />
      </View>
    );
  }
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
