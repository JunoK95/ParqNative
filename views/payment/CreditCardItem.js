import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableNativeReplacement from '../../components/layout/TouchableNativeReplacement';

const brands = {
  Visa: 'cc-visa',
  'American Express': 'cc-amex',
  'Diners Club': 'cc-diners-club',
  MasterCard: 'cc-mastercard',
  JCB: 'cc-jcb',
  Discover: 'cc-discover',
  UnionPay: 'credit-card',
  Unknown: 'credit-card',
};

const CreditCardItem = props => {
  const {card} = props;
  const [active, setactive] = useState(false);

  if (card) {
    const ccicon = brands[card.brand];
    return (
      <TouchableNativeReplacement
        color={'secondary'}
        onPress={() => setactive(!active)}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Icon
              style={styles.itemicon}
              name={ccicon ? ccicon : 'credit-card'}
              size={20}
            />
            <Text style={styles.itemtext}>{'... ' + card.last4}</Text>
          </View>
        </View>
      </TouchableNativeReplacement>
    );
  } else {
    return (
      <TouchableNativeReplacement color={'secondary'} onPress={() => {}}>
        <View style={styles.item}>
          <View style={styles.rowdisabled}>
            <View style={styles.col}>
              <Icon style={styles.itemicon} name={'times-circle'} size={20} />
            </View>
            <View style={styles.col}>
              <Text style={styles.itemtext}>{'No Payment Card Added'}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeReplacement>
    );
  }
};

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  itemicon: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
  },
  rowdisabled: {
    flexDirection: 'row',
    opacity: 0.3,
  },
  trashicon: {
    position: 'absolute',
    right: 0,
  },
});

export default CreditCardItem;
