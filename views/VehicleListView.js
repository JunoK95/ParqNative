import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import {AuthContext} from '../context/AuthContext';
import {ListItem} from 'react-native-elements';

const VehicleListView = props => {
  const context = useContext(AuthContext);
  const {saved_vehicles} = context;
  const vehicles = saved_vehicles.map((v, i) => {
    console.log('vehicle', v);
    return (
      <ListItem
        key={i}
        title={v.data.name}
        vehicle_id={v.id}
        leftIcon={{name: 'directions-car', color: '#000'}}
      />
    );
  });
  return (
    <View>
      <HeaderPadding to={'Home'} />
      {saved_vehicles.length > 0 ? (
        vehicles
      ) : (
        <Text>No Vehicles Registered</Text>
      )}
      <ListItem
        title={'Add Vehicle'}
        leftIcon={{name: 'add', color: '#000'}}
        onPress={() => props.navigation.navigate('VehicleReg')}
      />
    </View>
  );
};

export default VehicleListView;
