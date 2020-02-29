import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, Picker} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

const VehiclePicker = props => {
  const context = useContext(AuthContext);
  const {setvehicle} = props;
  const {saved_vehicles} = context;
  const [select, setselect] = useState(null);

  useEffect(() => {
    if (saved_vehicles) {
      if (saved_vehicles.length > 0) {
        setselect(saved_vehicles[0]);
        setvehicle(saved_vehicles[0]);
      }
    }
  }, [saved_vehicles, setvehicle]);

  let pickerItems;
  if (saved_vehicles) {
    pickerItems = saved_vehicles.map((v, i) => {
      console.log(v.data.name);
      return <Picker.Item key={i} label={`🚘 ${v.data.name}`} value={v} />;
    });
  }

  return (
    <View>
      <Text style={styles.pickerLabel}>Select Vehicle</Text>
      {pickerItems && (
        <Picker
          style={styles.picker}
          selectedValue={select}
          onValueChange={(itemValue, itemIndex) => {
            setselect(itemValue);
          }}>
          {pickerItems}
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginHorizontal: 24,
    minWidth: 260,
  },
  pickerLabel: {
    marginHorizontal: 24,
    color: '#555',
  },
});

export default VehiclePicker;
