import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const CustomDatePicker = props => {
  const {
    title,
    dateType,
    initialDate,
    setselected,
    openmodalbutton,
    mode,
    minimumDate,
  } = props;
  const [date, setDate] = useState(initialDate);
  const [moved, setmoved] = useState(false);
  const [modalopen, setmodalopen] = useState(false);

  useEffect(() => {
    if (initialDate) {
      setselected(initialDate);
      setDate(initialDate);
    }
  }, []);

  const handleDateChange = output => {
    setmoved(true);
    setDate(output);
  };

  const handleSubmit = () => {
    setmoved(true);
    setselected(date);
    setmodalopen(false);
  };

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => setmodalopen(true)}>
        {openmodalbutton ? (
          openmodalbutton
        ) : (
          <View style={styles.item}>
            <View style={styles.itemleft}>
              <FontAwesome5Icon
                name={'birthday-cake'}
                size={24}
                color={'#708090'}
              />
            </View>
            <View style={styles.itemright}>
              <Text style={styles.itemtext}>
                {moved ? moment(date).format('MMMM Do, YYYY') : 'Select Date'}
              </Text>
              <Text style={styles.itemsubtext}>{'Date of Birth'}</Text>
            </View>
          </View>
        )}
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
              <View style={styles.pickercontainer}>
                <View style={styles.pickerheader}>
                  <Text style={styles.pickertitle}>
                    {title ? title : 'Select'}
                  </Text>
                </View>
                <ScrollView contentContainerStyle={styles.centered}>
                  <DatePicker
                    date={date}
                    minimumDate={minimumDate}
                    onDateChange={output => {
                      handleDateChange(output);
                    }}
                    minuteInterval={dateType === 'datetime' ? 15 : 15}
                    mode={dateType ? dateType : 'date'}
                  />
                </ScrollView>
                <TouchableOpacity
                  style={styles.buttonrow}
                  onPress={handleSubmit}>
                  <Text style={styles.linktext}>SELECT</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </React.Fragment>
  );
};

export default withNavigation(CustomDatePicker);

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
  },
});
