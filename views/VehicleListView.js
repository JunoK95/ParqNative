import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import HeaderPadding from '../components/header-padding/HeaderPadding';
import {AuthContext} from '../context/AuthContext';
import {Icon} from 'react-native-elements';
import VehicleListItem from '../components/vehicle/vehicle-listitem';

const VehicleListView = props => {
  const context = useContext(AuthContext);
  const {saved_vehicles} = context;

  let vehicles = [];
  if (saved_vehicles) {
    vehicles = saved_vehicles.map((v, i) => {
      return <VehicleListItem vehicle={v} key={i} />;
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
        {saved_vehicles && vehicles}
        <View style={styles.centercontainer}>
          <TouchableHighlight
            onPress={() => props.navigation.navigate('VehicleReg')}
            style={styles.container}
            underlayColor={'#c2e8ff'}>
            <Text style={styles.text}>Add Vehicle</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollcontainer: {
    justifyContent: 'flex-start',
  },
  centercontainer: {
    justifyContent: 'center',
    alignSelf: 'center',
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
