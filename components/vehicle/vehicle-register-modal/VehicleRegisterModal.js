import React, {useContext, useState} from 'react';
import {StyleSheet, Modal, View, TouchableWithoutFeedback} from 'react-native';
import VehicleRegisterForm from '../vehicle-register-form';
import {AuthContext} from '../../../context/AuthContext';

const VehicleRegisterModal = ({open, setopen}) => {
  const context = useContext(AuthContext);
  const [inputs, setinputs] = useState('');

  const handleChange = data => {
    setinputs(data);
  };

  const handleSubmit = async () => {
    const {name, license_plate, us_state, make, model, year, color} = inputs;
    if (name === '' || license_plate === '' || us_state === '') {
      return;
    } else if (context) {
      const {addContextVehicle} = context.functions;
      try {
        await addContextVehicle({
          name,
          license_plate,
          us_state,
          make,
          model,
          year,
          color,
        });
        setopen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Modal
      animationType={'fade'}
      visible={open}
      transparent
      style={styles.modal}
      onRequestClose={() => setopen(false)}>
      <TouchableWithoutFeedback onPress={() => setopen(false)}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.box}>
              <VehicleRegisterForm
                onChange={handleChange}
                onSubmit={handleSubmit}
                trigger={setopen}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default VehicleRegisterModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  box: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 24,
    backgroundColor: 'white',
  },
});
