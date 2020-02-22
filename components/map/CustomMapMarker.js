import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {convertToDollar} from '../../helpers/helper';

const CustomMapMarker = props => {
  const {port, selected} = props;
  const dollarPrice = convertToDollar(port.price_hr);
  let isSelected = false;
  if (selected) {
    isSelected = port.id === selected.id;
  }

  return (
    <View
      style={
        isSelected
          ? {...styles.container, ...styles.selected}
          : {...styles.container, ...styles.unselected}
      }>
      <Text style={styles.text}>{`$${dollarPrice}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 4,
  },
  selected: {
    backgroundColor: '#ffc630',
  },
  unselected: {
    backgroundColor: '#11a4ff',
  },
  text: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    color: '#fff',
  },
});

export default CustomMapMarker;
