import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import {setTwoDigit} from '../../helpers/helper';

const ParkedVehiclesListItem = ({reservation}) => {
  const {vehicle_data, start, end} = reservation;
  const {
    color,
    license_plate,
    make,
    model,
    year,
    us_state,
    owner_id,
  } = vehicle_data;
  const [currenttime, setcurrenttime] = useState(moment().unix());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setcurrenttime(moment().unix());
    }, 1000);

    return () => clearInterval(intervalId); //This is important
  }, []);

  const handlePress = () => {
    console.log('Press');
  };

  const startTime = moment(start, 'X').format('hh:mm A');
  const startDate = moment(start, 'X').format('MM/DD');
  const endTime = moment(end, 'X').format('hh:mm A');
  const endDate = moment(end, 'X').format('MM/DD');

  let scheduleTxt;
  if (reservation) {
    let seconds = moment(reservation.end) - currenttime;
    if (seconds <= 0) {
      seconds = 0;
    }
    const durhours = moment.duration(seconds, 'seconds').hours();
    const durmin = setTwoDigit(moment.duration(seconds, 'seconds').minutes());
    const dursec = setTwoDigit(moment.duration(seconds, 'seconds').seconds());
    scheduleTxt = ` ${durhours}:${durmin}:${dursec}`;
  } else {
    scheduleTxt = reservation.end;
  }

  const remainingTime = moment(moment(end, 'X') - moment(start, 'X')).format('');

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.item}>
        <View style={styles.row}>
          <View style={styles.itemleft}>
            <FontAwesome5Icon
              name={'car'}
              color={color}
              size={24}
              onPress={handlePress}
            />
          </View>
          <View style={styles.itemcenter}>
            <Text style={styles.itemtext}>
              {license_plate + ' - ' + us_state}
            </Text>
            <Text style={styles.itemsubtext}>{`${make} ${model} ${year}`}</Text>
          </View>
          <View style={styles.itemright}>
            <View style={styles.inforow}>
              <FontAwesome5Icon
                name={'clock'}
                size={16}
                style={styles.clockicon}
                color={'#888'}
              />
              <Text numberOfLines={1} style={styles.itemrighttext}>
                {scheduleTxt}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.itemtext}>{startTime}</Text>
            <Text style={styles.itemsubtext}>{startDate}</Text>
          </View>
          <View style={styles.arrowicon}>
            <FontAwesome5Icon name={'arrow-right'} color={'black'} size={18} />
          </View>
          <View>
            <Text style={styles.itemtext}>{endTime}</Text>
            <Text style={styles.itemsubtext}>{endDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ParkedVehiclesListItem;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  itemleft: {
    flex: 1,
    paddingRight: 20,
    justifyContent: 'center',
  },
  itemcenter: {
    flex: 10,
    justifyContent: 'center',
  },
  itemright: {
    flex: 3,
    justifyContent: 'center',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  itemsubtext: {
    fontFamily: 'Montserrat-Medium',
    color: '#555',
    fontSize: 13,
  },
  itemrighttext: {
    fontFamily: 'Montserrat-Medium',
    color: '#555',
    fontSize: 13,
  },
  floatright: {
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  inforow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  clockicon: {
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    textAlignVertical: 'center',
  },
  arrowicon: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});
