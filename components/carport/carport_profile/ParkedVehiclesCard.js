import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import DuoIconListItem from '../../layout/DuoIconListItem';
import moment from 'moment';
import {withNavigation} from 'react-navigation';

const ParkedVehiclesCard = ({
  reservations,
  navigation,
  port_id,
  street_address,
}) => {
  const reserveItems = reservations.map((r, i) => {
    const {end} = r;
    const {color, us_state, license_plate, make, model} = r.vehicle_data;
    return (
      <DuoIconListItem
        key={i}
        leftIcon={'car'}
        leftIconColor={color}
        title={`${license_plate} - ${us_state}`}
        subtitle={`${make} ${model}`}
        rightText={moment(end, 'X').format('hh:mm A')}
        rightContent={<Text>{moment(end, 'X').format('hh:mm A')}</Text>}
      />
    );
  });

  const navigateTo = useCallback(() => {
    navigation.navigate('ParkedVehicles', {
      port_id: port_id,
      street_address,
    });
  }, [navigation, port_id, street_address]);

  return (
    <TouchableOpacity onPress={navigateTo}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.rowtitle}>
            <Text style={styles.rowitemtitle}>Currently Parked</Text>
          </View>
        </View>
        {reserveItems.length > 0 ? (
          <Text style={styles.rowitemtext2}>
            {reserveItems.length + ' Parked - Click to See More'}
          </Text>
        ) : (
          <Text style={styles.rowitemtext2}>No Currently Parked Vehicles</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(ParkedVehiclesCard);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
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
  iconOutline: {
    textShadowColor: 'black',
    textShadowRadius: 6,
    backgroundColor: 'black',
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
    paddingVertical: 16,
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
  rowpadding: {
    paddingHorizontal: 32,
  },
});
