import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RoundedButton from '../components/button/RoundedButton';
import HeaderPadding from '../components/header-padding/HeaderPadding';
import AccomodationCard from '../components/carport/carport_profile/AccomodationCard';
import RestrictionCard from '../components/carport/carport_profile/RestrictionCard';
import storeLogo from '../resources/images/112.png';
import {splitStrByComma, convertToDollar} from '../helpers/helper';
import ParkedVehiclesCard from '../components/carport/carport_profile/ParkedVehiclesCard';
import {withNavigationFocus} from 'react-navigation';
import PortInfoCard from '../components/carport/carport_profile/PortInfoCard';
import {getCurrentReservations} from '../firebase_func';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const typeMenu = {
  driveway: {
    label: 'Driveway',
    icon: 'road',
  },
  parkinglot: {
    label: 'Parking Lot',
    icon: 'parking',
  },
  garage: {
    label: 'Garage',
    icon: 'warehouse',
  },
  structure: {
    label: 'Structure',
    icon: 'building',
  },
};

const CarportHostView = props => {
  const {port, port_id} = props.navigation.state.params;
  const {isFocused} = props;
  const [reservations, setreservations] = useState();

  const splitAddress = splitStrByComma(port.location.address);
  const dollarPrice = convertToDollar(port.price_hr);

  let ptype = port.type;
  if (!ptype) {
    ptype = 'parkinglot';
  }

  const fetchReservations = useCallback(async () => {
    const res = await getCurrentReservations(port_id);
    setreservations(res);
  }, [port_id]);

  useEffect(() => {
    if (!port || !port_id) {
      return;
    }
    fetchReservations();
  }, [fetchReservations, port, port_id, isFocused]);

  let reserves = [];
  if (reservations) {
    for (var key of Object.keys(reservations)) {
      reserves.push(reservations[key]);
    }
  }

  const editButton = (
    <TouchableOpacity onPress={() => {}}>
      <FontAwesome5Icon name={'edit'} size={28} />
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <HeaderPadding to={'CarportList'} right={editButton} />
      <View style={styles.titlecontainer}>
        <View style={styles.itemcolumn}>
          <View style={styles.avatarcontainer}>
            <Image style={styles.avatar} source={storeLogo} />
          </View>
        </View>
        <View style={styles.itemcolumn}>
          <View style={styles.addresscontainer}>
            <Text style={styles.address}>{splitAddress[0] + ','}</Text>
            <Text style={styles.address}>
              {`${splitAddress[1]},${splitAddress[2]}`}
            </Text>
          </View>
        </View>
      </View>
      <ParkedVehiclesCard
        reservations={reserves}
        port_id={port_id}
        street_address={splitAddress[0]}
      />
      <PortInfoCard port={port} />
      <AccomodationCard accomodations={port.accomodations} />
      <RestrictionCard accomodations={port.accomodations} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  titlecontainer: {
    width: Dimensions.get('window').width - 64,
    marginVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowitem: {
    paddingVertical: 12,
    flexDirection: 'row',
  },
  rowitemtitle: {
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 15,
  },
  rowitemtext: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    color: '#777',
    fontSize: 15,
  },
  itemcolumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  avatarcontainer: {
    justifyContent: 'flex-start',
  },
  address: {
    fontSize: 18,
    textAlign: 'right',
    color: '#555',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  addresscontainer: {
    justifyContent: 'flex-end',
    paddingLeft: 24,
  },
});

export default withNavigationFocus(CarportHostView);
