import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const RestrictionCard = ({accomodations, onPress}) => {
  const restrictionMenu = {
    low_clearance: {
      label: 'Low Clearance',
      icon: 'truck',
      active: accomodations.low_clearance,
    },
    parallel: {
      label: 'Parallel',
      icon: 'equals',
      active: accomodations.parallel,
    },
    compact_only: {
      label: 'Compact Only',
      icon: 'car-side',
      active: accomodations.low_clearance,
    },
    no_reentry: {
      label: 'No Re-Entry',
      icon: 'door-closed',
      active: accomodations.low_clearance,
    },
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.rowtitle}>
            <Text style={styles.cardtitle}>Restrictions</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View
            style={
              accomodations.low_clearance
                ? styles.rowitem
                : {...styles.rowitem, opacity: 0.3}
            }>
            <View style={styles.itemcolumn}>
              <FontAwesome5Icon
                name={'truck'}
                size={26}
                color={accomodations.low_clearance ? 'red' : '#777'}
              />
            </View>
            <View style={styles.itemcolumn}>
              <Text
                numberOfLines={2}
                style={
                  accomodations.low_clearance
                    ? styles.rowitemtitle2
                    : styles.rowitemtitledisabled2
                }>
                Low Clear
              </Text>
            </View>
          </View>
          <View
            style={
              accomodations.parallel
                ? styles.rowitem
                : {...styles.rowitem, opacity: 0.3}
            }>
            <View style={styles.itemcolumn}>
              <FontAwesome5Icon
                name={'equals'}
                size={26}
                color={accomodations.parallel ? 'red' : '#777'}
              />
            </View>
            <View style={styles.itemcolumn}>
              <Text
                style={
                  accomodations.parallel
                    ? styles.rowitemtitle
                    : styles.rowitemtitledisabled
                }>
                Parallel
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View
            style={
              accomodations.compact_only
                ? styles.rowitem
                : {...styles.rowitem, opacity: 0.3}
            }>
            <View style={styles.itemcolumn}>
              <FontAwesome5Icon
                name={'car-side'}
                size={26}
                color={accomodations.compact_only ? 'red' : '#777'}
              />
            </View>
            <View style={styles.itemcolumn}>
              <Text
                style={
                  accomodations.compact_only
                    ? styles.rowitemtitle
                    : styles.rowitemtitledisabled
                }>
                Compact
              </Text>
            </View>
          </View>
          <View
            style={
              accomodations.no_reentry
                ? styles.rowitem
                : {...styles.rowitem, opacity: 0.3}
            }>
            <View style={styles.itemcolumn}>
              <FontAwesome5Icon
                name={'door-closed'}
                size={24}
                color={accomodations.no_reentry ? 'red' : '#777'}
              />
            </View>
            <View style={styles.itemcolumn}>
              <Text
                numberOfLines={2}
                style={
                  accomodations.no_reentry
                    ? styles.rowitemtitle2
                    : styles.rowitemtitledisabled2
                }>
                No ReEntry
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestrictionCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginVertical: 12,
    borderColor: 'red',
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
  rowitem: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 12,
    flexDirection: 'row',
  },
  cardtitle: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: 'red',
    fontSize: 15,
  },
  rowitemtitle: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: 'red',
    fontSize: 15,
  },
  rowitemtitle2: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: 'red',
    fontSize: 14,
  },
  rowitemtitledisabled: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 15,
  },
  rowitemtitledisabled2: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 14,
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
});
