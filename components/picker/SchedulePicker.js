import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import StartTimePicker from './schedule/StartTimePicker';
import EndTimePicker from './schedule/EndTimePicker';

const SchedulePicker = props => {
  const {initialDate, setselected, openmodalbutton} = props;
  const [date, setDate] = useState(initialDate);
  const [start, setstart] = useState(null);
  const [end, setend] = useState(null);
  const [opentimer, setopentimer] = useState(false);
  const [moved, setmoved] = useState(false);
  const [modalopen, setmodalopen] = useState(false);

  const handleDateChange = output => {
    setmoved(true);
    setDate(output);
  };

  const handleSubmit = endtime => {
    setmoved(true);
    if (!start || !endtime) {
      return;
    }
    setselected({
      start: start,
      end: endtime,
    });
    console.log({start, endtime});
    setstart(null);
    setend(null);
    setmodalopen(false);
  };

  const handleOpenTimer = () => {
    setselected(null);
    setmodalopen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setmodalopen(true)}>
        {openmodalbutton}
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        style={styles.modal}
        visible={modalopen}
        onRequestClose={() => setmodalopen(false)}>
        <TouchableWithoutFeedback
          onPress={() => {
            setmoved(true);
            setmodalopen(false);
          }}>
          <View style={styles.bg}>
            <TouchableWithoutFeedback onPress={() => {}}>
              {!start ? (
                <StartTimePicker
                  setselected={setstart}
                  setopentimer={setopentimer}
                />
              ) : (
                <EndTimePicker
                  setselected={endtime => handleSubmit(endtime)}
                  initialTime={start}
                  setstart={setstart}
                />
              )}
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default SchedulePicker;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bg: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
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
  itemleft: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  itemleft2: {
    paddingRight: 20,
    justifyContent: 'center',
  },
  itemright: {
    justifyContent: 'center',
  },
  itemtext: {
    fontSize: 17,
    paddingRight: 72,
  },
  itemsubtext: {
    fontWeight: 'bold',
    color: '#708090',
    fontSize: 15,
    paddingRight: 72,
  },
  linktext: {
    fontSize: 16,
    color: '#11a4ff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    marginLeft: 8,
  },
});
