import React, {useState, useContext} from 'react';
import {StyleSheet, View, Modal, TouchableWithoutFeedback} from 'react-native';
import {CreditCardInput} from 'react-native-input-credit-card';
import stripe from 'tipsi-stripe';
import CustomButton from '../../../components/button/CustomButton';
import {stripeCreateCard} from '../../../api/stripe_index';
import {AuthContext} from '../../../context/AuthContext';

const CardTokenGenerator = ({open, setopen}) => {
  const context = useContext(AuthContext);
  const [formData, setFormData] = useState({
    valid: false,
    values: {
      number: '',
      expiry: '',
      cvc: '',
      type: '',
      name: '',
      postalCode: '',
    },
    status: {
      number: 'incomplete',
      expiry: 'incomplete',
      cvc: 'incomplete',
      name: 'incomplete',
      postalCode: 'incomplete',
    },
  });

  const handleChange = form => {
    setFormData(form);
  };

  const handleSubmit = async () => {
    const {valid} = formData;
    if (valid) {
      const {number, expiry, cvc} = formData.values;
      const expMonth = parseInt(expiry.split('/')[0], 10);
      const expYear = parseInt(expiry.split('/')[1], 10);
      const data = {
        number,
        expMonth,
        expYear,
        cvc,
      };
      let cardToken;
      try {
        cardToken = await stripe.createTokenWithCard(data);
        console.log('CARD TOKEN => ', cardToken);
      } catch (error) {
        console.error('Error Creating Card Token =>', error);
        return;
      }
      if (cardToken) {
        let newcard;
        try {
          newcard = await stripeCreateCard(
            context.user_data.stripe_customer_id,
            cardToken.tokenId,
          );
          console.log('new card created => ', newcard);
          setopen(false);
        } catch (error) {
          console.error('Error Creating Card =>', error);
          return;
        }
      }
    } else {
      console.warn('Form Not Valid');
      return;
    }
  };

  return (
    <Modal
      animationType={'fade'}
      visible={open}
      transparent
      style={styles.modal}
      onRequestClose={() => setopen(false)}>
      <TouchableWithoutFeedback onPress={() => setopen(false)}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.box}>
              <CreditCardInput
                inputStyle={styles.fieldContainer}
                labels={{
                  number: 'CARD NUMBER',
                  expiry: 'EXPIRY',
                  cvc: 'CVC',
                }}
                allowScroll
                onChange={handleChange}
              />
              <View style={styles.buttonRow}>
                <CustomButton
                  title={'ADD PAYMENT'}
                  handlePress={handleSubmit}
                />
                <CustomButton
                  reverse
                  title={'CANCEL'}
                  handlePress={() => setopen(false)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CardTokenGenerator;

const styles = StyleSheet.create({
  fieldContainer: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  formLine: {
    flexDirection: 'row',
  },
  bg: {
    flex: 1,
    backgroundColor: '#11a4ff',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  box: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 48,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
