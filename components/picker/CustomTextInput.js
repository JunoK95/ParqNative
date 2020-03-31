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
import {withNavigation} from 'react-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from 'react-native-wheel-pick';

const CustomTextInput = props => {
  const {title, initialitem, setselected, inputType} = props;
  const [select, setselect] = useState(initialitem);
  const [modalopen, setmodalopen] = useState(false);
  const [picker1, setpicker1] = useState(null);
  const [picker2, setpicker2] = useState(null);

  useEffect(() => {
    setselected(initialitem);
    setselect(initialitem);
    if (inputType === 'dollar') {
      const int_part = Math.trunc(initialitem);
      const float_part = Number((initialitem - int_part).toFixed(2));
      console.log(int_part, float_part);
      setpicker1(int_part);
      setpicker2((float_part * 100).toString());
    }
  }, []);

  const handleSubmit = () => {
    if (inputType === 'dollar') {
      console.log(picker1 + picker2);
      setselected(picker1 + picker2);
      setmodalopen(false);
    } else if (inputType === 'number') {
      console.log(select);
      setselected(select);
      setmodalopen(false);
    }
  };

  const handleCentChange = value => {
    const newValue = parseFloat(value) / 100;
    setpicker2(newValue);
  };

  const handleDollarChange = value => {
    setpicker1(parseFloat(value));
  };

  const handleSelectChange = value => {
    setselect(value);
  };

  let pickerItem = null;
  if (inputType === 'dollar') {
    const dollarArray = [...Array(100).keys()].map(x => x + 1);
    const centArray = [
      '00',
      '05',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40',
      '45',
      '50',
      '55',
      '60',
      '65',
      '70',
      '75',
      '80',
      '85',
      '90',
      '95',
    ];
    pickerItem = (
      <View style={styles.centercontainer}>
        <FontAwesome5Icon name={'dollar-sign'} size={20} />
        <Picker
          style={styles.dollarpicker}
          selectedValue={picker1}
          pickerData={dollarArray}
          onValueChange={value => handleDollarChange(value)}
          itemSpace={30} // this only support in android
        />
        <Text style={styles.pickertitle}>.</Text>
        <Picker
          style={styles.dollarpicker}
          selectedValue={picker2}
          pickerData={centArray}
          onValueChange={value => handleCentChange(value)}
          itemSpace={30} // this only support in android
        />
      </View>
    );
  } else if (inputType === 'number') {
    const numberArray = [...Array(100).keys()].map(x => x + 1);
    pickerItem = (
      <View style={styles.centercontainer}>
        <Picker
          style={styles.dollarpicker}
          selectedValue={select}
          pickerData={numberArray}
          onValueChange={value => handleSelectChange(value)}
          itemSpace={30} // this only support in android
        />
      </View>
    );
  }

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
                <View style={styles.pickerheader}>
                  <Text style={styles.pickertitle}>
                    {title ? title : 'Select'}
                  </Text>
                </View>
                {pickerItem}
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

export default withNavigation(CustomTextInput);

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
  centercontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dollarpicker: {
    backgroundColor: 'white',
    width: 48,
    height: 180,
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
  buttonrow: {
    alignItems: 'flex-end',
    padding: 12,
    paddingRight: 48,
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
