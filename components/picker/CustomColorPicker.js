import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from 'react-native';
import CustomPickerItem from './CustomPickerItem';

const colors = [
  {
    color: 'black',
    label: 'Black',
    hex: '#000',
  },
  {
    color: 'blue',
    label: 'Blue',
    hex: '#214FC6',
  },
  {
    color: 'brown',
    label: 'Brown',
  },
  {
    color: 'beige',
    label: 'Beige',
  },
  {
    color: 'gold',
    label: 'Gold',
  },
  {
    color: 'gray',
    label: 'Gray',
  },
  {
    color: 'green',
    label: 'Green',
  },
  {
    color: 'orange',
    label: 'Orange',
  },
  {
    color: 'purple',
    label: 'Purple',
  },
  {
    color: 'red',
    label: 'Red',
  },
  {
    color: 'silver',
    label: 'Silver',
  },
  {
    color: 'white',
    label: 'White',
  },
  {
    color: 'yellow',
    label: 'Yellow',
  },
  {
    color: 'pink',
    label: 'Pink',
  },
];

const CustomColorPicker = props => {
  const {setmodalopen, modalopen, setselected} = props;

  const handlePress = color => {
    setselected(color);
    setmodalopen(false);
  };

  let colorItems = [];
  colorItems = colors.map((c, i) => {
    return (
      <CustomPickerItem
        key={i}
        title={c.label}
        icon={'car'}
        iconColor={c.color}
        handlePress={() => handlePress(c.color)}
      />
    );
  });

  return (
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
                <Text style={styles.pickertitle}>{'Select Color'}</Text>
              </View>
              <ScrollView>{colorItems}</ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomColorPicker;

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
