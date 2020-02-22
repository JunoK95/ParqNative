import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  convertToDollar,
  distanceBetweenCoordinates,
  splitStrByComma,
} from '../../helpers/helper';
import {withNavigation} from 'react-navigation';
import storeLogo from '../../resources/images/112.png';

const CarportCard = props => {
  const {port, currentlocation, setopen} = props;

  const handleClick = () => {
    if (setopen) {
      setopen(false);
    }
    props.navigation.navigate('CarportInfo', {port});
  };

  const handleBook = () => {
    if (setopen) {
      setopen(false);
    }
    props.navigation.navigate('PayParking', {port});
  };

  if (!port) {
    return null;
  }

  let distance;
  if (currentlocation) {
    distance = distanceBetweenCoordinates(
      currentlocation.latitude,
      currentlocation.longitude,
      port.location.coordinates.lat,
      port.location.coordinates.lng,
    );
  }

  let scheduleTxt;
  if (port.schedule.allday) {
    scheduleTxt = '24hr';
  } else {
    scheduleTxt = `${port.schedule.start}-${port.schedule.end}`;
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
            <View style={styles.box}>
              <Text style={styles.distance}>{distance + ' mi'}</Text>
              <Text style={styles.distance}>{scheduleTxt}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardheader}>
          <View style={styles.left}>
            <Image style={styles.avatar} source={storeLogo} />
          </View>
        </View>
        <TouchableHighlight
          style={styles.button}
          underlayColor={'#ffc630'}
          onPress={handleBook}>
          <Text style={styles.buttonText}>Book</Text>
        </TouchableHighlight>
      </TouchableOpacity>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    width: 340,
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
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  },
  avatar: {
    width: 48,
    height: 48,
    marginLeft: 12,
  },
  button: {
    paddingHorizontal: 80,
    paddingVertical: 8,
    backgroundColor: '#11a4ff',
    borderRadius: 20,
    margin: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});

export default withNavigation(CarportCard);
