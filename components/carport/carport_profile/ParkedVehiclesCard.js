import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const ParkedVehiclesCard = props => {
  const {reservations} = props;

  const reserveItems = reservations.map((r, i) => {
    return (
      <TouchableOpacity key={i}>
        <View style={styles.row}>
          <View style={styles.rowitem}>
            <View style={styles.itemcolumn}>
              <FontAwesome5Icon name={'car'} size={30} />
            </View>
            <View style={styles.itemcolumn}>
              <Text style={styles.rowitemtitle}>
                {r.vehicle_data.license_plate}
              </Text>
              <Text style={styles.rowitemtext}>
                {r.vehicle_data.make + ' ' + r.vehicle_data.model}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rowtitle}>
          <Text style={styles.rowitemtitle}>Currently Parked</Text>
        </View>
      </View>
      <View style={styles.row}>
        {reserveItems.length > 0 ? (
          reserveItems
        ) : (
          <Text style={styles.rowitemtext2}>No Currently Parked Vehicles</Text>
        )}
      </View>
    </View>
  );
};

export default ParkedVehiclesCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 64,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginVertical: 12,
    paddingVertical: 12,
    borderColor: '#000',
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
    color: '#000',
    fontSize: 15,
  },
  rowitemtext: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    color: '#777',
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
    paddingHorizontal: 4,
  },
  cardtitle: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 15,
  },
});
