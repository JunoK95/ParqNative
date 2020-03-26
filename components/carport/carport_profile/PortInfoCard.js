import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {convertToDollar} from '../../../helpers/helper';

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

const PortInfoCard = props => {
  const {port} = props;

  const dollarPrice = convertToDollar(port.price_hr);
  let ptype = port.type;
  if (!ptype) {
    ptype = 'parkinglot';
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rowitem}>
          <View style={styles.itemcolumn}>
            <FontAwesome5Icon name={'coins'} size={26} />
          </View>
          <View style={styles.itemcolumn}>
            <Text style={styles.rowitemtitle}>Price/hr</Text>
            <Text style={styles.rowitemtext}>{'$ ' + dollarPrice}</Text>
          </View>
        </View>
        <View style={styles.rowitem}>
          <View style={styles.itemcolumn}>
            <FontAwesome5Icon name={typeMenu[ptype].icon} size={30} />
          </View>
          <View style={styles.itemcolumn}>
            <Text style={styles.rowitemtitle}>Type</Text>
            <Text style={styles.rowitemtext}>{typeMenu[ptype].label}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.itemcolumn}>
          <Text style={styles.rowitemtitle2}>Parking Instructions</Text>
          <Text style={styles.rowitemtext2}>
            {port.parking_instructions
              ? port.parking_instructions
              : 'no parking instructions provided'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PortInfoCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginVertical: 12,
    paddingVertical: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowitem: {
    paddingBottom: 12,
    flexDirection: 'row',
  },
  rowitemtitle: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 15,
  },
  rowitemtext: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    color: '#777',
    fontSize: 15,
  },
  rowitemtitle2: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 15,
  },
  rowitemtext2: {
    textAlign: 'center',
    fontFamily: 'Montserrat-MediumItalic',
    color: '#777',
    fontSize: 15,
  },
  itemcolumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
