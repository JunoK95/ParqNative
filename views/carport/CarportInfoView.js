import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import HeaderPadding from '../../components/layout/HeaderPadding';
import storeLogo from '../../resources/images/112.png';
import {splitStrByComma, convertToDollar} from '../../helpers/helper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AccomodationCard from '../../components/carport/carport_profile/AccomodationCard';
import RestrictionCard from '../../components/carport/carport_profile/RestrictionCard';

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

const CarportInfoView = props => {
  const {port} = props.navigation.state.params;
  const splitAddress = splitStrByComma(port.location.address);
  const dollarPrice = convertToDollar(port.price_hr);

  let ptype = port.type;
  if (!ptype) {
    ptype = 'parkinglot';
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <HeaderPadding to={'Nearby'} />
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
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.rowitem}>
            <View style={styles.itemcolumn}>
              <FontAwesome5Icon name={'coins'} size={26} />
            </View>
            <View style={styles.itemcolumn}>
              <Text style={styles.rowitemtitle}>Price/hr</Text>
              <Text style={styles.rowitemtext}>{'$ ' + dollarPrice}</Text>
            </View>
          </View>
          <View style={styles.rowitem}>
            <View style={styles.itemcolumn}>
              <FontAwesome5Icon name={typeMenu[ptype].icon} size={30} />
            </View>
            <View style={styles.itemcolumn}>
              <Text style={styles.rowitemtitle}>Type</Text>
              <Text style={styles.rowitemtext}>{typeMenu[ptype].label}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.itemcolumn}>
            <Text style={styles.rowitemtitle2}>Parking Instructions</Text>
            <Text style={styles.rowitemtext2}>{port.parking_instructions}</Text>
          </View>
        </View>
      </View>
      <AccomodationCard accomodations={port.accomodations} />
      <RestrictionCard accomodations={port.accomodations} />
      {/* <ListItem title={port.location.address} subtitle={'address'} />
      <ListItem title={port.available_spaces} subtitle={'spaces available'} />
      <ListItem title={port.description} subtitle={'description'} />
      <ListItem title={port.schedule.start} subtitle={'start time'} />
      <ListItem title={port.schedule.end} subtitle={'end time'} />
      <ListItem title={port.schedule.allday.toString()} subtitle={'24h'} /> */}
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
});

export default CarportInfoView;
