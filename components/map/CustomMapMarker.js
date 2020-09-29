import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {convertToDollar} from '../../helpers/helper';

const CustomMapMarker = props => {
  const {port, selected, unavailable} = props;
  const dollarPrice = convertToDollar(port.price_hr);
  let isSelected = false;
  if (selected) {
    isSelected = port.id === selected.id;
  }

  if (unavailable) {
    return (
      <View style={{...styles.container, ...styles.unavailable}}>
        <Text style={styles.text}>{`$${dollarPrice}`}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={() => console.log('Press')}>
      <View
        style={
          isSelected
            ? {...styles.container, ...styles.selected}
            : {...styles.container, ...styles.unselected}
        }>
        <Text style={styles.text}>{`$${dollarPrice}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  selected: {
    backgroundColor: '#ffc630',
  },
  unselected: {
    backgroundColor: '#11a4ff',
  },
  unavailable: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    opacity: 0.5,
  },
  unavailabletext: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
  },
});

export default CustomMapMarker;
