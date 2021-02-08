import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../../../../context/AuthContext';
import {
  getCarportSchedule,
  setCarportSchedule,
} from '../../../../firebase_func/scheduling-functions';
import RoundedButton from '../../../button/RoundedButton';
import OrbLoading from '../../../loading/OrbLoading';
import CarportSetScheduleItem from './carport-set-schedule-item/CarportSetScheduleItem';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const defaultSchedule = {
  mon: {
    enabled: true,
    allday: true,
    start: '0:00',
    end: '23:00',
  },
  tue: {
    enabled: true,
    allday: true,
    start: '0:00',
    end: '23:00',
  },
  wed: {
    enabled: true,
    allday: true,
    start: '0:00',
    end: '20:00',
  },
  thu: {
    enabled: true,
    allday: true,
    start: '0:00',
    end: '23:00',
  },
  fri: {
    enabled: true,
    allday: true,
    start: '0:00',
    end: '23:00',
  },
  sat: {
    enabled: true,
    allday: true,
    start: '0:00',
    end: '23:00',
  },
  sun: {
    enabled: true,
    allday: true,
    start: '0:00',
    end: '23:00',
  },
};

const CarportSetSchedule = ({port_id, handleBack}) => {
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const context = useContext(AuthContext);

  const fetchSchedule = useCallback(async () => {
    setLoading(true);
    try {
      console.log('PORT ID', port_id);
      const initialSchedule = await getCarportSchedule(port_id);
      console.log('Initial Schedule', initialSchedule);
      if (initialSchedule) {
        setSchedule(initialSchedule);
      } else {
        setSchedule(defaultSchedule);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [port_id]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await setCarportSchedule(port_id, context.user_id, schedule);
    } catch (e) {
      console.error('ERROR SETTING CARPORT SCHEDULE =>', e);
      return;
    }
    setLoading(false);
    handleBack();
    return;
  };

  const changeScheduleValue = useCallback(
    (day, name, value) => {
      setSchedule({
        ...schedule,
        [day]: {
          ...schedule[day],
          [name]: value,
        },
      });
    },
    [schedule],
  );

  let scheduleObjects = weekdays.map((day, i) => {
    return (
      <CarportSetScheduleItem
        key={i}
        day={day}
        day_props={schedule[day]}
        handleChange={changeScheduleValue}
      />
    );
  });

  if (loading) {
    return <OrbLoading />;
  }

  return (
    <View style={styles.formContainer}>
      {scheduleObjects}
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <RoundedButton
            title={'Back'}
            backgroundColor={'transparent'}
            fontSize={16}
            onPress={handleBack}
          />
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
            title={'Submit'}
            disabled={loading}
            backgroundColor={'#11a4ff'}
            fontSize={16}
            textColor={'white'}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default CarportSetSchedule;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 4,
  },
  buttonContainer: {
    minWidth: 80,
    marginHorizontal: 8,
  },
  buttonRow: {
    padding: 12,
    paddingBottom: 64,
  },
});
