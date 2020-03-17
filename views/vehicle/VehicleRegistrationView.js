import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Text,
} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';
import {Input} from 'react-native-elements';
import {AuthContext} from '../../context/AuthContext';

const VehicleRegistrationView = props => {
  const context = useContext(AuthContext);
  const [inputs, setinputs] = useState({
    name: '',
    license_plate: '',
    us_state: '',
    make: '',
    model: '',
    year: '',
    description: '',
  });

  const handleChange = (name, text) => {
    setinputs({
      ...inputs,
      [name]: text,
    });
  };

  const handleSubmit = async () => {
    const {
      name,
      license_plate,
      us_state,
      make,
      model,
      year,
      description,
    } = inputs;
    if (name === '' || license_plate === '' || us_state === '') {
      return;
    } else if (context) {
      const {addContextVehicle} = context.functions;
      addContextVehicle(
        name,
        license_plate,
        us_state,
        make,
        model,
        year,
        description,
      )
        .then(res => {
          props.navigation.navigate('VehicleList');
          console.log('added Vehicle', res);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <View>
      <HeaderPadding to={'VehicleList'} />
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
        <Input
          containerStyle={styles.textField}
          multiline
          name={'description'}
          placeholder={'(optional)'}
          label={'additional info'}
          value={inputs.description}
          onChangeText={text => handleChange('description', text)}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor={'#ffc630'}
          onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 64,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
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
});

export default VehicleRegistrationView;
