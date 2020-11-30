import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ExpandableListItem from '../../components/expandable-list-item/ExpandableListItem';
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

const CreditCardItem = ({card, handleCardDelete}) => {
  const childRef = useRef();
  const [active, setactive] = useState(false);

  let listItemComponent;
  let expandComponent;
  if (card) {
    const ccicon = brands[card.brand];
    listItemComponent = (
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
    );

    expandComponent = (
      <View style={styles.row}>
        <View style={styles.deletecolumn}>
          <TouchableNativeReplacement
            color={'gray'}
            onPress={() => childRef.current.handleExpand(false)}>
            <View style={styles.deleteitem}>
              <View style={styles.centeredRow}>
                <Text style={styles.cancelText}>Cancel</Text>
              </View>
            </View>
          </TouchableNativeReplacement>
        </View>
        <View style={styles.deletecolumn}>
          <TouchableNativeReplacement color={'red'} onPress={handleCardDelete}>
            <View style={styles.deleteitem}>
              <View style={styles.centeredRow}>
                <Text style={styles.deleteText}>Delete</Text>
              </View>
            </View>
          </TouchableNativeReplacement>
        </View>
      </View>
    );

    return (
      <ExpandableListItem
        ref={childRef}
        listItemComponent={listItemComponent}
        expandComponent={expandComponent}
      />
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
  deleteitem: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  deletecolumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  deleteText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
  },
  cancelText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
  },
});

export default CreditCardItem;
