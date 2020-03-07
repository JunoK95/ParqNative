import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Platform,
  Linking,
} from 'react-native';
import FeaturesList from '../carport/FeaturesList';
import {
  splitStrByComma,
  convertToDollar,
  setTwoDigit,
} from '../../helpers/helper';
import storeLogo from '../../resources/images/112.png';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const ReservationItem = props => {
  const {port, reservation} = props;
  const [currenttime, setcurrenttime] = useState(moment().unix());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setcurrenttime(moment().unix());
    }, 1000);

    return () => clearInterval(intervalId); //This is important
  }, []);

  const handleClick = () => {
    console.log('handleclick');
  };

  const openGps = (lat, lng) => {
    var url = `google.navigation:q=${lat},${lng}`;
    if (Platform === 'ios') {
      url = `maps://app?saddr=100+101&daddr=${lat}+${lng}`;
    }
    Linking.openURL(url);
  };

  if (!port) {
    return null;
  }

  let scheduleTxt;
  if (reservation) {
    const seconds = moment(reservation.end) - currenttime;
    const durhours = moment.duration(seconds, 'seconds').hours();
    const durmin = setTwoDigit(moment.duration(seconds, 'seconds').minutes());
    const dursec = setTwoDigit(moment.duration(seconds, 'seconds').seconds());
    scheduleTxt = ` ${durhours}:${durmin}:${dursec}`;
  } else {
    scheduleTxt = reservation.end;
  }

  const splitAddress = splitStrByComma(port.location.address);

  if (port) {
    return (
      <TouchableOpacity style={styles.container} onPress={handleClick}>
        <View style={styles.cardheader}>
          <View style={styles.left}>
            <View style={styles.box}>
              <Text style={styles.price}>
                {'$' + convertToDollar(port.price_hr) + '/hr'}
              </Text>
              <Text numberOfLines={1} style={styles.address}>
                {splitAddress[0]}
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <Icon name={'clock'} style={styles.distance} />
            <Text style={styles.distance}>{scheduleTxt}</Text>
          </View>
        </View>
        <View style={styles.contentcontainer}>
          <View style={styles.leftcontent}>
            <View style={styles.avatarcontainer}>
              <Image style={styles.avatar} source={storeLogo} />
            </View>
          </View>
          <View style={styles.centercontent} />
          <View style={styles.rightcontent}>
            <FeaturesList features={port.accomodations} type={port.type} />
          </View>
        </View>
        <View style={styles.buttonrow}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={'#ffc630'}
            onPress={() =>
              openGps(
                port.location.coordinates.lat,
                port.location.coordinates.lng,
              )
            }>
            <View style={styles.row}>
              <FontAwesome5Icon
                name={'map-marked-alt'}
                size={16}
                color={'white'}
              />
              <Text style={styles.buttonText}> Get Directions </Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableOpacity>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    width: 340,
    height: 200,
    backgroundColor: '#fff',
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
  cardheader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    marginTop: 12,
  },
  contentcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  doublecontainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  box: {
    flexDirection: 'column',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftcontent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  avatarcontainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centercontent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightcontent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  address: {
    fontSize: 16,
    color: '#888',
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  distance: {
    fontSize: 16,
    color: '#888',
    textAlign: 'right',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    textAlignVertical: 'center',
  },
  restriction: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  restrictitem: {
    backgroundColor: '#fa8072',
    color: 'white',
    marginHorizontal: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    marginLeft: 12,
  },
  avatardisabled: {
    width: 48,
    height: 48,
    marginLeft: 12,
    opacity: 0.3,
  },
  buttonrow: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 12,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ReservationItem;
