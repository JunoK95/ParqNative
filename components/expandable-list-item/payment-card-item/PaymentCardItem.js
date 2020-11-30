import React from 'react';
import {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableNativeReplacement from '../../layout/TouchableNativeReplacement';
import ExpandableListItem from '../ExpandableListItem';

const PaymentCardItem = ({last_4_digits}) => {
  const childRef = useRef();
  const listItemComponent = (
    <View style={styles.item}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Icon style={styles.itemicon} name={'university'} size={20} />
        </View>
        <View style={styles.col}>
          <Text style={styles.itemsubtext}>{'... ' + last_4_digits}</Text>
        </View>
      </View>
    </View>
  );

  const expandComponent = (
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
        <TouchableNativeReplacement
          color={'red'}
          onPress={() => childRef.current.handleExpand(false)}>
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
};

export default PaymentCardItem;

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  deleteitem: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  rowdisabled: {
    flexDirection: 'row',
    opacity: 0.3,
  },
  row: {
    flexDirection: 'row',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  deletecolumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
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
  itemsubtext: {
    fontFamily: 'Montserrat-Medium',
    color: '#777',
    fontSize: 13,
  },
  itemicon: {
    paddingHorizontal: 20,
  },
});
