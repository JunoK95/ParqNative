import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from 'react-native';
import CustomPickerItem from '../picker/CustomPickerItem';

const NewCustomPicker = ({open, setopen, title, items, onChange}) => {
  const handleChange = value => {
    onChange(value);
    setopen(false);
  };

  let pickerItems = null;
  if (items.length > 0) {
    pickerItems = items.map((item, i) => {
      return (
        <CustomPickerItem
          key={i}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
          handlePress={() => {
            handleChange(item);
          }}
        />
      );
    });
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      style={styles.modal}
      visible={open}
      onRequestClose={() => setopen(false)}>
      <TouchableWithoutFeedback onPress={() => setopen(false)}>
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
  );
};

export default NewCustomPicker;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bg: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
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
});
