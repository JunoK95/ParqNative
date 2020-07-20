import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import TouchableNativeReplacement from '../../layout/TouchableNativeReplacement';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../../../context/AuthContext';

const VehicleListItem = ({vehicle}) => {
  const context = useContext(AuthContext);
  const [deleting, setdeleting] = useState(false);

  const handleDeletePress = async () => {
    setdeleting(true);
    try {
      await context.functions.deleteContextVehicle(vehicle.id);
    } catch (error) {
      console.error('Could Not Delete Vehicle');
      setdeleting(false);
    }
  };

  return (
    <TouchableNativeReplacement
      color={'primary'}
      vehicle_id={vehicle.id}
      disabled={deleting}
      onPress={() => console.log(vehicle)}>
      <View style={styles.item}>
        <View style={styles.itemleft}>
          <FontAwesome5Icon name={'car'} size={26} color={vehicle.data.color} />
        </View>
        <View style={styles.itemcenter}>
          <Text style={styles.itemtext}>
            {vehicle.data.name + ' - ' + vehicle.data.license_plate}
          </Text>
          <Text style={styles.itemsubtext}>
            {vehicle.data.make + ' ' + vehicle.data.model}
          </Text>
        </View>
        <View style={styles.itemright}>
          <FontAwesome5Icon
            style={styles.floatright}
            name={'trash'}
            size={20}
            color={'#11a4ff'}
            onPress={handleDeletePress}
          />
        </View>
      </View>
    </TouchableNativeReplacement>
  );
};

export default VehicleListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    width: Dimensions.get('window').width,
  },
  itemleft: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  itemcenter: {
    flex: 10,
    justifyContent: 'center',
  },
  itemright: {
    flex: 1,
    paddingRight: 20,
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    paddingRight: 72,
  },
  itemsubtext: {
    fontFamily: 'Montserrat-Medium',
    color: '#555',
    fontSize: 13,
    paddingRight: 72,
  },
  floatright: {
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
});
