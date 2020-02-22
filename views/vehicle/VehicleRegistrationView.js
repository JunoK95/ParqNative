import React, {useState} from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';

const VehicleRegistrationView = () => {
  const [inputs, setinputs] = useState({
    name: '',
    license_plate: '',
    us_state: '',
    make: '',
    model: '',
    year: '',
  });

  const handleChange = (name, text) => {
    setinputs({
      ...inputs,
      [name]: text,
    });
  };

  return (
    <View>
      <HeaderPadding to={'VehicleList'} />
      <TextInput
        style={styles.textField}
        name={'name'}
        placeholder={'Vehicle Name'}
        value={inputs.name}
        onChangeText={text => handleChange('name', text)}
      />
      <TextInput
        style={styles.textField}
        name={'license_plate'}
        placeholder={'License Plate'}
        value={inputs.license_plate}
        onChangeText={text => handleChange('license_plate', text)}
      />
      <TextInput
        style={styles.textField}
        name={'us_state'}
        placeholder={'State'}
        value={inputs.make}
        onChangeText={text => handleChange('us_state', text)}
      />
      <TextInput
        style={styles.textField}
        name={'make'}
        placeholder={'Make'}
        value={inputs.make}
        onChangeText={text => handleChange('make', text)}
      />
      <TextInput
        style={styles.textField}
        name={'model'}
        placeholder={'Model'}
        value={inputs.model}
        onChangeText={text => handleChange('model', text)}
      />
      <TextInput
        style={styles.textField}
        name={'year'}
        placeholder={'Year'}
        value={inputs.make}
        onChangeText={text => handleChange('year', text)}
      />
      <Button
        containerStyle={styles.buttonContainer}
        title={'Register Vehicle'}
        onPress={() => console.log('Register Vehicle')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#11a4ff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingVertical: 8,
    paddingRight: 12,
    color: '#ffc630',
  },
  textFieldContainer: {
    margin: 12,
    marginHorizontal: 64,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textField: {
    height: 48,
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  buttonContainer: {
    margin: 12,
    marginHorizontal: 48,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default VehicleRegistrationView;
