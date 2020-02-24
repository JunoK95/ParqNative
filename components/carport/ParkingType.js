import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ParkingType = () => {
  const reference = {
    driveway: {
      label: 'Driveway',
      icon: 'road',
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon name={'road'} size={36} />
        <Text style={styles.text}> Driveway</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
});

export default ParkingType;
