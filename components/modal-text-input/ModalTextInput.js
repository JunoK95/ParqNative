import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import RoundedButton from '../button/RoundedButton';

const ModalTextInput = ({title, initialitem, setselected}) => {
  const [value, setValue] = useState();
  const [error, setError] = useState();
  const [modalopen, setmodalopen] = useState(false);

  useEffect(() => {
    setselected(initialitem);
  }, []);

  function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }

  const handleSubmit = () => {
    if (isNormalInteger(value)) {
      setselected(value);
      setmodalopen(false);
    } else {
      setError('Please Enter a Valid Number');
    }
  };

  const onChangeTextInput = text => {
    const numericRegex = /^([0-9]{1,100})+$/;
    if (numericRegex.test(text) || !text) {
      setValue(text);
    }
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
                <Text style={styles.pickertitle}>Enter Available Spaces</Text>
                <View style={styles.row}>
                  <TextInput
                    value={value}
                    onChangeText={text => onChangeTextInput(text)}
                    maxLength={6}
                    placeholder={'0'}
                    autoFocus={true}
                    keyboardType={'numeric'}
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

export default withNavigation(ModalTextInput);

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
