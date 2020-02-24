import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FeaturesList = props => {
  const {features, type, disabled} = props;
  const {covered, ev_charging} = features;

  const typeMenu = {
    driveway: {
      label: 'Driveway',
      icon: 'road',
    },
    parkinglot: {
      label: 'Parking Lot',
      icon: 'parking',
    },
    garage: {
      label: 'Garage',
      icon: 'warehouse',
    },
    structure: {
      label: 'Structure',
      icon: 'building',
    },
  };

  let ptype = type;
  if (!ptype) {
    ptype = 'driveway';
  }

  return (
    <View style={disabled ? styles.rowcontainerdisabled : styles.rowcontainer}>
      <View style={styles.column}>
        <Icon name={typeMenu[ptype].icon} size={44} color={'#444'} />
      </View>
      <View style={styles.column}>
        <View style={styles.row}>
          <Icon
            name={'umbrella'}
            size={20}
            color={covered ? '#4cbb17' : '#ccc'}
          />
        </View>
        <View style={styles.row}>
          <Icon
            name={'charging-station'}
            size={20}
            color={ev_charging ? '#4cbb17' : '#ccc'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowcontainerdisabled: {
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.3,
  },
  column: {
    paddingHorizontal: 4,
  },
  item: {
    backgroundColor: '#ccc',
    textAlign: 'center',
    width: 96,
    paddingVertical: 4,
    margin: 2,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default FeaturesList;
