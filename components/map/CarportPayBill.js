import React from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {convertToDollar} from '../../helpers/helper';

const CarportPayBill = ({prices}) => {
  if (prices === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else if (prices) {
    const {subtotal, fees, total_price} = prices;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.leftContainer}>
            <Text style={styles.leftText}>Subtotal</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.rightText}>
              ${convertToDollar(subtotal / 100)}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.leftContainer}>
            <Text style={styles.leftText}>{'Tax & Fees'}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.rightText}>${convertToDollar(fees / 100)}</Text>
          </View>
        </View>
        <View style={styles.totalRow}>
          <View style={styles.leftContainer} />
          <View style={styles.rightContainer}>
            <Text style={styles.rightTotalText}>
              ${convertToDollar(total_price / 100)}
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default CarportPayBill;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    marginVertical: 16,
    width: '80%',
    backgroundColor: '#EEE',
    borderRadius: 32,
  },
  row: {
    flexDirection: 'row',
  },
  totalRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderTopWidth: 1,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  leftText: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  rightText: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    fontFamily: 'Montserrat',
  },
  rightTotalText: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    fontSize: 18,
  },
});
