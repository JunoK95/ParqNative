import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomPickerItem from '../../picker/CustomPickerItem';
import {AuthContext} from '../../../context/AuthContext';
import {withNavigation} from 'react-navigation';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const VehiclePicker = props => {
  const context = useContext(AuthContext);
  const {saved_vehicles} = context;
  const {setselected, title, setopen} = props;
  const [vehicle, setvehicle] = useState(null);
  const [modalopen, setmodalopen] = useState(false);

  useEffect(() => {
    if (saved_vehicles) {
      if (saved_vehicles.length > 0) {
        setvehicle(saved_vehicles[0]);
        setselected(saved_vehicles[0]);
      }
    }
  }, [saved_vehicles, setselected]);

  let pickerItems;
  if (saved_vehicles) {
    pickerItems = saved_vehicles.map((v, i) => {
      console.log(v.data.name);
      return (
        <CustomPickerItem
          key={i}
          title={v.data.name}
          subtitle={v.data.license_plate}
          icon={'car'}
          iconColor={v.data.color}
          handlePress={() => {
            setvehicle(v);
            setselected(v);
            setmodalopen(false);
            console.log(vehicle);
          }}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => setmodalopen(true)}>
        <View style={styles.item}>
          <View style={styles.itemleft}>
            <FontAwesome5Icon
              name={'car'}
              size={24}
              color={vehicle ? vehicle.data.color : 'black'}
            />
          </View>
          <View style={styles.itemright}>
            <Text style={styles.itemtext}>
              {vehicle ? vehicle.data.name : 'Select Vehicle'}
            </Text>
            {vehicle && (
              <Text style={styles.itemsubtext}>
                {vehicle.data.license_plate}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        style={styles.modal}
        visible={modalopen}
        onRequestClose={() => setmodalopen(false)}>
        <TouchableWithoutFeedback onPress={() => setmodalopen(false)}>
          <View style={styles.bg}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.pickercontainer}>
                <View style={styles.pickerheader}>
                  <Text style={styles.pickertitle}>
                    {title ? title : 'Select'}
                  </Text>
                </View>
                <ScrollView>
                  {pickerItems}
                  <CustomPickerItem
                    title={'Add A Vehicle'}
                    icon={'plus'}
                    handlePress={() => {
                      setmodalopen(false);
                      setopen(true);
                      // props.navigation.navigate('VehicleReg');
                    }}
                  />
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </React.Fragment>
  );
};

export default withNavigation(VehiclePicker);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bg: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  pickercontainer: {
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: Dimensions.get('window').height * 0.4,
    opacity: 1,
  },
  pickerheader: {
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#ffc630',
    alignItems: 'center',
  },
  pickertitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  itemleft: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  itemleft2: {
    paddingRight: 20,
    justifyContent: 'center',
  },
  itemright: {
    justifyContent: 'center',
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
});
