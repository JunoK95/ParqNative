import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import {AuthContext} from '../context/AuthContext';
import {Icon} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#c2e8ff')}
          key={i}
          vehicle_id={v.id}
          onPress={() => console.log(v)}>
          <View style={styles.item}>
            <View style={styles.row}>
              <FontAwesome5Icon
                style={styles.itemicon}
                name={'car'}
                size={20}
              />
              <Text style={styles.itemtext}>{v.data.name}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
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
  item: {
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  itemicon: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
  },
});

export default VehicleListView;
