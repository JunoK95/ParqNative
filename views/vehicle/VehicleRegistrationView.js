import React, {useState, useContext, useCallback} from 'react';
import HeaderPadding from '../../components/header-padding/HeaderPadding';
import {AuthContext} from '../../context/AuthContext';
import VehicleRegisterForm from '../../components/vehicle/vehicle-register-form/VehicleRegisterForm';
import {withNavigation} from 'react-navigation';
import OrbLoading from '../../components/loading/OrbLoading';
import {View} from 'react-native';

const VehicleRegistrationView = props => {
  const context = useContext(AuthContext);
  const [inputs, setinputs] = useState('');
  const [load, setload] = useState(false);

  const handleChange = useCallback(data => {
    setinputs(data);
  }, []);

  const handleSubmit = async () => {
    const {name, license_plate, us_state, make, model, year, color} = inputs;
    if (name === '' || license_plate === '' || us_state === '') {
      return;
    } else if (context) {
      const {addContextVehicle} = context.functions;
      try {
        setload(true);
        await addContextVehicle({
          name,
          license_plate,
          us_state,
          make,
          model,
          year,
          color,
        });
        setload(false);
        props.navigation.navigate('VehicleList');
      } catch (error) {
        setload(false);
        console.error(error);
      }
    }
  };

  if (load) {
    return <OrbLoading />;
  }
  return (
    <View>
      <HeaderPadding to={'VehicleList'} />
      <VehicleRegisterForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        handleBack={() => props.navigation.navigate('VehicleList')}
      />
    </View>
  );
};

export default withNavigation(VehicleRegistrationView);
