import React, {useState, useEffect} from 'react';
import {Input} from 'react-native-elements';
import {ScrollView, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {getGeocodeAddress} from '../../firebase_func/firestoreFunctions';
import {combineString} from '../../helpers/helper';

const AddressForm = props => {
  const {setaddress, setstage} = props;
  const [inputs, setinputs] = useState({
    address: '',
    address2: '',
    city: '',
    us_state: '',
    zipcode: '',
  });
  const [disabled, setdisabled] = useState(true);

  useEffect(() => {
    for (const key of Object.keys(inputs)) {
      if (inputs[key] === '' && key !== 'address2') {
        setdisabled(true);
        return;
      }
    }
    setdisabled(false);
  }, [inputs]);

  const handleTextChange = (name, text) => {
    setinputs({
      ...inputs,
      [name]: text,
    });
  };

  const handleSubmit = async () => {
    const {address, address2, city, us_state, zipcode} = inputs;

    const address_string = combineString([
      address,
      address2,
      city,
      us_state,
      zipcode,
    ]);
    setdisabled(true);
    await getGeocodeAddress(address_string).then(res => {
      console.log(res.data);
      setaddress(res.data.results[0]);
      setdisabled(false);
      setstage(2);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.formcontainer}>
      <Input
        containerStyle={styles.inputcontainer}
        value={inputs.address}
        onChangeText={text => handleTextChange('address', text)}
        placeholder={'e.g. 123 Parq St.'}
        label={'Address'}
        textContentType={'streetAddressLine1'}
      />
      <Input
        containerStyle={styles.inputcontainer}
        value={inputs.address2}
        onChangeText={text => handleTextChange('address2', text)}
        placeholder={'(optional)'}
        label={'Address 2'}
        textContentType={'streetAddressLine2'}
      />
      <Input
        containerStyle={styles.inputcontainer}
        value={inputs.city}
        onChangeText={text => handleTextChange('city', text)}
        label={'City'}
        textContentType={'addressCity'}
      />
      <Input
        containerStyle={styles.inputcontainer}
        value={inputs.us_state}
        onChangeText={text => handleTextChange('us_state', text)}
        label={'State'}
        textContentType={'addressState'}
      />
      <Input
        containerStyle={styles.inputcontainer}
        value={inputs.zipcode}
        onChangeText={text => handleTextChange('zipcode', text)}
        label={'Zipcode'}
        textContentType={'postalCode'}
        keyboardType={'numeric'}
      />
      <TouchableHighlight
        disabled={disabled}
        style={disabled ? styles.buttondisabled : styles.button}
        underlayColor={'#ffc630'}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Find Location</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  formcontainer: {
    paddingBottom: 12,
    paddingVertical: 24,
  },
  inputcontainer: {
    minWidth: 260,
    paddingBottom: 8,
  },
  title: {
    height: 400,
  },
});

export default AddressForm;
