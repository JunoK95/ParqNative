import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, ScrollView, TouchableHighlight} from 'react-native';
import {Input} from 'react-native-elements';
import CustomColorPicker from '../../picker/CustomColorPicker';
import CustomPickerItem from '../../picker/CustomPickerItem';
import {capitalizeFirstLetter, isNumber} from '../../../helpers/helper';

const VehicleRegisterForm = ({onChange, onSubmit}) => {
  const [open, setopen] = useState(false);
  const [valid, setvalid] = useState(false);
  const [color, setcolor] = useState(null);
  const [inputs, setinputs] = useState({
    name: '',
    license_plate: '',
    us_state: '',
    make: '',
    model: '',
    year: '',
    valid: false,
  });
  const [status, setstatus] = useState({
    name: false,
    license_plate: false,
    us_state: false,
    make: false,
    model: false,
    year: false,
    color: false,
  });

  useEffect(() => {
    isValid();
    onChange({...inputs, color, status});
  }, [inputs, color, status]);

  const checkField = (field, value) => {
    if (['name', 'license_plate', 'make', 'model'].includes(field)) {
      if (value.length < 1) {
        setstatus({...status, [field]: false});
      } else {
        setstatus({...status, [field]: true});
      }
    } else if (field === 'year') {
      if (value.length !== 4) {
        setstatus({...status, [field]: false});
      } else {
        setstatus({...status, [field]: true});
      }
    } else if (field === 'us_state') {
      if (value.length !== 2) {
        setstatus({...status, [field]: false});
      } else {
        setstatus({...status, [field]: true});
      }
    } else if (field === 'color') {
      if (value) {
        setstatus({...status, [field]: true});
      } else {
        setstatus({...status, [field]: false});
      }
    }
  };

  const handleChange = (name, text) => {
    checkField(name, text);
    isValid();
    setinputs({
      ...inputs,
      [name]: text,
    });
  };

  const handleSubmit = async () => {
    onSubmit();
  };

  const isValid = () => {
    if (Object.values(status).every(item => item === true)) {
      setvalid(true);
    } else {
      setvalid(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.formcontainer}>
      <Input
        containerStyle={styles.textField}
        name={'name'}
        label={'Vehicle Name'}
        placeholder={'e.g. My Favorite Car'}
        value={inputs.name}
        onChangeText={text => handleChange('name', text)}
      />
      <Input
        containerStyle={styles.textField}
        name={'license_plate'}
        label={'License Plate'}
        value={inputs.license_plate}
        onChangeText={text => handleChange('license_plate', text)}
      />
      <Input
        containerStyle={styles.textField}
        name={'us_state'}
        placeholder={'State'}
        label={'State'}
        value={inputs.us_state}
        onChangeText={text => handleChange('us_state', text)}
      />
      <Input
        containerStyle={styles.textField}
        name={'make'}
        placeholder={'e.g. Honda'}
        label={'Make'}
        value={inputs.make}
        onChangeText={text => handleChange('make', text)}
      />
      <Input
        containerStyle={styles.textField}
        name={'model'}
        placeholder={'e.g. Accord'}
        label={'Model'}
        value={inputs.model}
        onChangeText={text => handleChange('model', text)}
      />
      <Input
        containerStyle={styles.textField}
        name={'year'}
        placeholder={'Year'}
        label={'Year'}
        value={inputs.year}
        maxLength={4}
        keyboardType={'numeric'}
        onChangeText={text => handleChange('year', text)}
      />
      <CustomColorPicker
        modalopen={open}
        setmodalopen={setopen}
        setselected={value => {
          checkField('color', value);
          setcolor(value);
        }}
      />
      <CustomPickerItem
        title={color ? capitalizeFirstLetter(color) : 'Select Vehicle Color'}
        icon={'car'}
        iconColor={color}
        handlePress={() => setopen(true)}
      />
      <TouchableHighlight
        disabled={!valid}
        style={valid ? styles.button : styles.buttondisabled}
        underlayColor={'#ffc630'}
        onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

export default VehicleRegisterForm;

const styles = StyleSheet.create({
  formcontainer: {
    padding: 32,
    paddingHorizontal: 56,
    paddingBottom: 80,
  },
  textFieldContainer: {
    margin: 12,
    marginHorizontal: 64,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textField: {
    minWidth: 260,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  textFieldError: {
    minWidth: 260,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  inputcontainer: {
    minWidth: 260,
    paddingBottom: 8,
  },
  buttonContainer: {
    margin: 12,
    marginHorizontal: 48,
    alignContent: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#11a4ff',
    borderRadius: 20,
    margin: 8,
  },
  buttondisabled: {
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#11a4ff',
    opacity: 0.3,
    borderRadius: 20,
    margin: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  screen: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  success: {
    color: 'lightgreen',
  },
});
