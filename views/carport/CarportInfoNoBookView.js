import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import HeaderPadding from '../../components/header-padding/HeaderPadding';
import storeLogo from '../../resources/images/112.png';
import {splitStrByComma, convertToDollar} from '../../helpers/helper';
import AccomodationCard from '../../components/carport/carport_profile/AccomodationCard';
import RestrictionCard from '../../components/carport/carport_profile/RestrictionCard';
import PortInfoCard from '../../components/carport/carport_profile/PortInfoCard';
import ContactInfoCard from '../../components/carport/carport_profile/ContactInfoCard';

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

const CarportInfoNoBookView = props => {
  const {port, previousScreen} = props.navigation.state.params;
  const splitAddress = splitStrByComma(port.location.address);
  const dollarPrice = convertToDollar(port.price_hr);

  let ptype = port.type;
  if (!ptype) {
    ptype = 'parkinglot';
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <HeaderPadding to={previousScreen ? previousScreen : 'ReservationList'} />
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
      <ContactInfoCard port={port} />
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
  container: {
    width: Dimensions.get('window').width - 64,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginVertical: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
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
  rowitemtitle2: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: '#444',
    fontSize: 15,
  },
  rowitemtext2: {
    textAlign: 'center',
    fontFamily: 'Montserrat-MediumItalic',
    color: '#777',
    fontSize: 15,
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
  buttonrow: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 12,
  },
  button: {
    width: 220,
    paddingVertical: 8,
    backgroundColor: '#11a4ff',
    borderColor: '#11a4ff',
    borderRadius: 20,
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});

export default CarportInfoNoBookView;
