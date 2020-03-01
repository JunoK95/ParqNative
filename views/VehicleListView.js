import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import {AuthContext} from '../context/AuthContext';
import {ListItem, Icon} from 'react-native-elements';

const VehicleListView = props => {
  const context = useContext(AuthContext);
  const {saved_vehicles} = context;

  if (!saved_vehicles) {
    return null;
  }

  let vehicles = [];
  if (saved_vehicles) {
    vehicles = saved_vehicles.map((v, i) => {
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
  }

  return (
    <View>
      <HeaderPadding
        to={'Home'}
        right={
          <TouchableOpacity
            onPress={() => props.navigation.navigate('VehicleReg')}>
            <Icon name={'add'} size={30} color={'#000'} />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.scrollcontainer}>
        {saved_vehicles.length > 0 && vehicles}
        <TouchableHighlight
          onPress={() => props.navigation.navigate('VehicleReg')}
          style={styles.container}
          underlayColor={'#c2e8ff'}>
          <Text style={styles.text}>Add Vehicle</Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollcontainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: 340,
    height: 48,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontFamily: 'Montserrat-MediumItalic',
  },
});

export default VehicleListView;
