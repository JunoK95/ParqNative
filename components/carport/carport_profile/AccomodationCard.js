import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const AccomodationCard = ({accomodations, onPress}) => {
  const menu = [
    {
      label: 'Covered',
      icon: 'umbrella',
      active: accomodations.covered,
    },
    {
      label: 'EV Charge',
      icon: 'charging-station',
      active: accomodations.ev_charging,
    },
  ];

  const menuItems = menu.map((item, i) => {
    if (item.active) {
      return (
        <View key={i} style={styles.rowitem}>
          <View style={styles.itemcolumn}>
            <FontAwesome5Icon name={item.icon} size={26} />
          </View>
          <View style={styles.itemcolumn}>
            <Text style={styles.rowitemtitle}>{item.label}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View key={i} style={styles.rowitemoff}>
          <View style={styles.itemcolumn}>
            <FontAwesome5Icon name={item.icon} size={26} />
          </View>
          <View style={styles.itemcolumn}>
            <Text style={styles.rowitemtitleoff}>{item.label}</Text>
          </View>
        </View>
      );
    }
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.rowtitle}>
            <Text style={styles.rowitemtitle}>Accomodations</Text>
          </View>
        </View>
        <View style={styles.row}>{menuItems}</View>
      </View>
    </TouchableOpacity>
  );
};

export default AccomodationCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginVertical: 12,
    borderColor: 'green',
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
  rowtitle: {
    paddingTop: 12,
  },
  rowitemoff: {
    paddingVertical: 12,
    flexDirection: 'row',
    opacity: 0.3,
  },
  rowitemtitleoff: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 15,
  },
  rowitemtextoff: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    color: '#777',
    fontSize: 15,
  },
  rowitem: {
    paddingVertical: 12,
    flexDirection: 'row',
  },
  rowitemtitle: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: 'green',
    fontSize: 15,
  },
  rowitemtext: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    color: '#777',
    fontSize: 15,
  },
  itemcolumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cardtitle: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 15,
  },
});
