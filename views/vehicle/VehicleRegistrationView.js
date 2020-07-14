import React, {useState, useContext} from 'react';
import HeaderPadding from '../../components/header-padding/HeaderPadding';
import {AuthContext} from '../../context/AuthContext';
import VehicleRegisterForm from '../../components/vehicle/vehicle-register-form/VehicleRegisterForm';

const VehicleRegistrationView = props => {
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <React.Fragment>
      <HeaderPadding to={'VehicleList'} />
      <VehicleRegisterForm onChange={handleChange} onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

export default VehicleRegistrationView;
