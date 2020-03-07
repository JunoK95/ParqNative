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
import CustomPickerItem from '../picker/CustomPickerItem';
import {withNavigation} from 'react-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const CustomPicker = props => {
  const {title, items, initialitem, setselected} = props;
  const [select, setselect] = useState(initialitem);
  const [modalopen, setmodalopen] = useState(false);

  useEffect(() => {
    setselected(initialitem);
    setselect(initialitem);
  }, []);

  let pickerItems;
  if (items) {
    pickerItems = items.map((item, i) => {
      return (
        <CustomPickerItem
          key={i}
          title={item.title}
          subtitle={item.subtitle}
          icon={'stopwatch'}
          handlePress={() => {
            setselect(item);
            setselected(item);
            setmodalopen(false);
          }}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => setmodalopen(true)}>
        <View style={styles.item}>
          <View style={styles.itemleft}>
            <FontAwesome5Icon name={'stopwatch'} size={24} />
          </View>
          <View style={styles.itemright}>
            <Text style={styles.itemtext}>
              {select ? select.title : 'Select Hours'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        style={styles.modal}
        visible={modalopen}
        onRequestClose={() => setmodalopen(false)}>
        <TouchableWithoutFeedback onPress={() => setmodalopen(false)}>
          <View style={styles.bg}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.pickercontainer}>
                <View style={styles.pickerheader}>
                  <Text style={styles.pickertitle}>
                    {title ? title : 'Select'}
                  </Text>
                </View>
                <ScrollView>{pickerItems}</ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </React.Fragment>
  );
};

export default withNavigation(CustomPicker);

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
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    paddingRight: 72,
  },
  itemsubtext: {
    fontFamily: 'Montserrat-Medium',
    color: '#555',
    fontSize: 13,
    paddingRight: 72,
  },
});
