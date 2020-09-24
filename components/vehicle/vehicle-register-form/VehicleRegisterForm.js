import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, ScrollView, TouchableHighlight} from 'react-native';
import USStateData from '../../../resources/data/us_state.json';
import CarMakeData from '../../../resources/data/car_manufacturer.json';
import {Input} from 'react-native-elements';
import CustomColorPicker from '../../picker/CustomColorPicker';
import CustomPickerItem from '../../picker/CustomPickerItem';
import {capitalizeFirstLetter} from '../../../helpers/helper';
import NewCustomPicker from '../../picker/NewCustomPicker';
import RoundedButton from '../../button/RoundedButton';

const VehicleRegisterForm = ({onChange, onSubmit}) => {
  const [open, setopen] = useState(false);
  const [stateModalOpen, setStateModalOpen] = useState(false);
  const [makeModalOpen, setMakeModalOpen] = useState(false);
  const [yearModalOpen, setYearModalOpen] = useState(false);
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

  const isValid = useCallback(() => {
    if (Object.values(status).every(item => item === true)) {
      setvalid(true);
    } else {
      setvalid(false);
    }
  }, [status]);

  const createYearList = () => {
    const currentYear = new Date().getFullYear();
    const range = (start, stop, step) =>
      Array.from(
        {length: (stop - start) / step + 1},
        (_, i) => start + i * step,
      );
    const yearArray = range(currentYear, currentYear - 50, -1);
    const yearData = yearArray.map((year, i) => {
      return {
        title: year,
        value: year,
      };
    });
    return yearData;
  };

  const yearData = createYearList();

  useEffect(() => {
    isValid();
    onChange({...inputs, color, status});
  }, [inputs, color, status, isValid, onChange]);

  const checkField = (field, value) => {
    if (['name', 'license_plate', 'make', 'model'].includes(field)) {
      if (value.length < 1) {
        setstatus({...status, [field]: false});
      } else {
        setstatus({...status, [field]: true});
      }
    } else if (field === 'year') {
      if (!value) {
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
      if (!value) {
        setstatus({...status, [field]: false});
      } else {
        setstatus({...status, [field]: true});
      }
    }
  };

  const handleChange = (name, text) => {
    checkField(name, text);
    setinputs({
      ...inputs,
      [name]: text,
    });
  };

  const handleUSStateChange = item => {
    checkField('us_state', item.value);
    setinputs({
      ...inputs,
      us_state: item.value,
    });
  };

  const handleMakeModalChange = item => {
    checkField('make', item.value);
    setinputs({
      ...inputs,
      make: item.value,
    });
  };

  const handleYearModalChange = item => {
    checkField('year', item.value.toString());
    setinputs({
      ...inputs,
      year: item.value.toString(),
    });
  };

  const handleSubmit = async () => {
    onSubmit();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.formcontainer}
      keyboardShouldPersistTaps={'handled'}
      accessible={false}>
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
        placeholder={'e.g. CA'}
        label={'State'}
        maxLength={2}
        value={inputs.us_state}
        onTouchStart={() => setStateModalOpen(true)}
      />
      <Input
        containerStyle={styles.textField}
        name={'make'}
        placeholder={'e.g. Honda'}
        label={'Make'}
        value={inputs.make}
        onTouchStart={() => setMakeModalOpen(true)}
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
        onTouchStart={() => setYearModalOpen(true)}
      />
      <NewCustomPicker
        title={'US State'}
        items={USStateData}
        open={stateModalOpen}
        setopen={setStateModalOpen}
        onChange={handleUSStateChange}
      />
      <NewCustomPicker
        title={'Car Make'}
        items={CarMakeData}
        open={makeModalOpen}
        setopen={setMakeModalOpen}
        onChange={handleMakeModalChange}
      />
      <NewCustomPicker
        title={'Model Year'}
        items={yearData}
        open={yearModalOpen}
        setopen={setYearModalOpen}
        onChange={handleYearModalChange}
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
      <RoundedButton
        disabled={!valid}
        backgroundColor={'#11a4ff'}
        fontSize={18}
        textColor={'white'}
        onPress={() => handleSubmit()}
        title={'Register'}
      />
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
