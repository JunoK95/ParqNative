import moment from 'moment';
import React, {useState, useRef, useEffect} from 'react';
import {Modal} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ExpandableListItem from '../../../../expandable-list-item/ExpandableListItem';
import CustomListItemSwitch from '../../../../layout/CustomListItemSwitch';
import TouchableNativeReplacement from '../../../../layout/TouchableNativeReplacement';
import DatePicker from 'react-native-date-picker';
import RoundedButton from '../../../../button/RoundedButton';

const dayIndex = {
  mon: {
    title: 'Monday',
  },
  tue: {
    title: 'Tuesday',
  },
  wed: {
    title: 'Wednesday',
  },
  thu: {
    title: 'Thursday',
  },
  fri: {
    title: 'Friday',
  },
  sat: {
    title: 'Saturday',
  },
  sun: {
    title: 'Sunday',
  },
};

const CarportSetScheduleItem = ({day, day_props, handleChange}) => {
  const {enabled, start, end, allday} = day_props;
  const childRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [switchState, setSwitchState] = useState(enabled);
  const [allDayState, setAllDayState] = useState(allday);
  const [schedule, setSchedule] = useState({
    start: new Date(moment(start, 'HH:mm')),
    end: new Date(moment(end, 'HH:mm')),
  });

  useEffect(() => {
    handleChange(day, 'enabled', switchState);
  }, [switchState]);

  useEffect(() => {
    handleChange(day, 'allday', allDayState);
  }, [allDayState]);

  useEffect(() => {
    if (moment(schedule.start) > moment(schedule.end)) {
      setSchedule({...schedule, end: schedule.start});
    }
    handleChange(day, 'start', moment(schedule.start).format('HH:mm'));
  }, [schedule.start]);

  useEffect(() => {
    handleChange(day, 'end', moment(schedule.end).format('HH:mm'));
  }, [schedule.end]);

  const listItemComponent = (
    <CustomListItemSwitch
      title={dayIndex[day].title}
      subtitle={
        allDayState
          ? '24hr'
          : `${moment(schedule.start, 'hh:mm').format('hh:mm A')} - ${moment(
              schedule.end,
              'hh:mm',
            ).format('hh:mm A')}`
      }
      active={switchState}
      handleSwitch={() => {
        childRef.current.handleExpand(!switchState);
        setSwitchState(!switchState);
      }}
    />
  );

  const expandComponent = (
    <View style={styles.row}>
      <View style={styles.column}>
        <TouchableNativeReplacement
          color={'#FFC630'}
          onPress={() => {
            setAllDayState(true);
          }}>
          <View style={styles.item}>
            <View style={styles.centered}>
              <FontAwesome5Icon
                style={styles.text}
                name={allDayState ? 'dot-circle' : 'circle'}
              />
              <Text style={styles.text}> 24 Hours</Text>
            </View>
          </View>
        </TouchableNativeReplacement>
      </View>
      <View style={styles.column}>
        <TouchableNativeReplacement
          color={'#FFC630'}
          onPress={() => {
            setAllDayState(false);
            setModalOpen(true);
          }}>
          <View style={styles.item}>
            <View style={styles.centered}>
              <FontAwesome5Icon
                style={styles.text}
                name={!allDayState ? 'dot-circle' : 'circle'}
              />
              <Text style={styles.text}> Set Custom</Text>
            </View>
          </View>
        </TouchableNativeReplacement>
      </View>
    </View>
  );

  const timeModal = (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalOpen}
      onRequestClose={() => setModalOpen(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeTitle}>Start</Text>
          <DatePicker
            date={schedule.start}
            onDateChange={output => {
              setSchedule({...schedule, start: output});
            }}
            mode={'time'}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeTitle}>End</Text>
          <DatePicker
            date={schedule.end}
            minimumDate={schedule.start}
            onDateChange={output => {
              setSchedule({...schedule, end: output});
            }}
            mode={'time'}
          />
        </View>
        <RoundedButton
          title={'Set Time'}
          backgroundColor={'#11A4FF'}
          textColor={'white'}
          width={200}
          fontSize={18}
          onPress={() => setModalOpen(false)}
        />
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ExpandableListItem
        ref={childRef}
        listItemComponent={listItemComponent}
        expandComponent={expandComponent}
        expanded={switchState}
      />
      {timeModal}
    </View>
  );
};

export default CarportSetScheduleItem;

const styles = StyleSheet.create({
  container: {
    margin: 6,
    borderWidth: 2,
    borderRadius: 24,
    borderColor: '#11A4FF',
  },
  item: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  row: {
    borderTopWidth: 1,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    borderColor: '#888',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  centered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#11a4ff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
