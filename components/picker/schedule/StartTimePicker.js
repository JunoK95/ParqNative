import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const StartTimePicker = props => {
  const {setselected, setopentimer, initialTime} = props;
  const [date, setDate] = useState(initialTime ? initialTime : new Date());

  const handleDateChange = output => {
    setDate(output);
  };

  const handleNext = () => {
    setselected(date);
  };

  const handleOpenTimer = () => {
    setopentimer(true);
  };

  return (
    <View style={styles.pickercontainer}>
      <View style={styles.pickerheader}>
        <Text style={styles.pickertitle}>{'Select Start'}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.centered}>
        <DatePicker
          date={date}
          onDateChange={output => {
            handleDateChange(output);
          }}
          minuteInterval={15}
          mode={'time'}
        />
      </ScrollView>
      <View style={styles.buttonrow}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => {
              handleOpenTimer();
            }}>
            <Text style={styles.linktext}>Set Timer</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleNext(date);
          }}>
          <Text style={styles.linktext}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartTimePicker;

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 14,
  },
  buttonrow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 12,
    paddingRight: 48,
  },
  pickercontainer: {
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: Dimensions.get('window').height * 0.4,
    opacity: 1,
  },
  pickerheader: {
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#ffc630',
    alignItems: 'center',
  },
  pickertitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  left: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  right: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  linktext: {
    fontSize: 16,
    color: '#11a4ff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    marginLeft: 8,
  },
});
