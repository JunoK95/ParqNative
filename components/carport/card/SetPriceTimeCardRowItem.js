import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import SchedulePicker from '../../picker/SchedulePicker';

const SetPriceTimeCardRowItem = props => {
  const {endtime, setendtime, schedule, setschedule} = props;

  if (schedule) {
    if (schedule.enabled) {
      return (
        <View style={styles.contentrow}>
          <View style={styles.left}>
            <Text style={styles.price} numberOfLines={1}>
              {moment(schedule.start).format('hh:mm A') +
                ' - ' +
                moment(schedule.end).format('hh:mm A')}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setschedule(null)}>
            <View style={styles.right}>
              <Text style={styles.linktextred}>Reset Time</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  if (endtime) {
    return (
      <View style={styles.contentrow}>
        <View style={styles.left}>
          <Text style={styles.price} numberOfLines={1}>
            {moment(endtime).calendar()}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setendtime(null)}>
          <View style={styles.right}>
            <Text style={styles.linktextred}>Cancel Timer</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.contentrow}>
        <View style={styles.left}>
          <Text style={styles.price}>{'No Schedule'}</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.right}>
            <SchedulePicker
              title={'Set Schedule'}
              dateType={'datetime'}
              setschedule={setschedule}
              setendtime={setendtime}
              openmodalbutton={
                <Text style={styles.linktext}>Set Schedule</Text>
              }
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default SetPriceTimeCardRowItem;

const styles = StyleSheet.create({
  contentrow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  linktext: {
    fontSize: 16,
    color: '#11a4ff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  linktextred: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});
