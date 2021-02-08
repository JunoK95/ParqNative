import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import RoundedButton from '../button/RoundedButton';
import MoneyInput from 'react-native-money-input';

const ModalCurrencyInput = ({title, initialitem, setselected}) => {
  const [value, setValue] = useState();
  const [modalopen, setmodalopen] = useState(false);

  useEffect(() => {
    setselected(initialitem);
  }, []);

  const handleSubmit = () => {
    setselected(value);
    setmodalopen(false);
  };

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => setmodalopen(true)}>
        <Text style={styles.linktext}>{title}</Text>
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
                <TouchableOpacity
                  style={styles.exitIcon}
                  onPress={() => setmodalopen(false)}>
                  <FontAwesome5Icon
                    style={styles.exitIcon}
                    name={'times'}
                    size={16}
                  />
                </TouchableOpacity>
                <Text style={styles.pickertitle}>Enter Hourly Price</Text>
                <View style={styles.row}>
                  <FontAwesome5Icon
                    name={'dollar-sign'}
                    size={24}
                    style={styles.dollarIcon}
                  />
                  <MoneyInput
                    onChangeText={text => setValue(text)}
                    maxLength={6}
                    autoFocus={true}
                    style={styles.inputcontainer}
                  />
                </View>
                <RoundedButton
                  title={'Submit'}
                  backgroundColor={'#11a4ff'}
                  textColor={'white'}
                  fontSize={16}
                  width={200}
                  onPress={() => handleSubmit()}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </React.Fragment>
  );
};

export default ModalCurrencyInput;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 32,
  },
  bg: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  dollarIcon: {
    padding: 6,
  },
  exitIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 48,
    paddingLeft: 32,
  },
  pickercontainer: {
    backgroundColor: '#ffc630',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
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
  linktext: {
    fontSize: 16,
    color: '#11a4ff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  inputcontainer: {
    color: '#fff',
    fontSize: 64,
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    borderWidth: 0,
  },
});
