import moment from 'moment';
import React from 'react';
import {Image} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {convertToDollar, splitStrByComma} from '../../helpers/helper';
import FeaturesList from '../carport/FeaturesList';

const CarportPayCardHeader = ({
  price_hr,
  address,
  schedule,
  accomodations,
  image_src,
  port,
}) => {
  let scheduleTxt;
  if (port.timer_end) {
    if (moment().add(1, 'd') > moment(port.timer_end, 'X')) {
      scheduleTxt = 'until ' + moment(port.timer_end, 'X').format('hh:mm A');
    } else {
      scheduleTxt = 'until ' + moment(port.timer_end, 'X').format('MMM DD');
    }
  } else if (port.schedule) {
    if (port.schedule.allday) {
      scheduleTxt = '24hr';
    } else {
      scheduleTxt = `${moment(port.schedule.start, 'HH:mm').format(
        'hh:mma',
      )} - ${moment(port.schedule.end, 'HH:mm').format('hh:mma')}`;
    }
  } else {
    scheduleTxt = '24hr';
  }
  const splitAddress = splitStrByComma(port.location.address);

  return (
    <React.Fragment>
      <View style={styles.cardheader}>
        <View style={styles.left}>
          <View style={styles.box}>
            <Text style={styles.price}>
              {'$' + convertToDollar(price_hr) + '/hr'}
            </Text>
            <Text numberOfLines={1} style={styles.address}>
              {splitAddress[0]}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.box}>
            <Text style={styles.distance}>{scheduleTxt}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardheader}>
        <View style={styles.left}>
          <Image style={styles.avatar} source={image_src} />
        </View>
        <FeaturesList features={accomodations} />
      </View>
    </React.Fragment>
  );
};

export default CarportPayCardHeader;

const styles = StyleSheet.create({
  cardheader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
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
  box: {
    flexDirection: 'column',
  },
  avatar: {
    width: 48,
    height: 48,
    marginLeft: 12,
  },
  distance: {
    fontSize: 16,
    color: '#888',
    textAlign: 'right',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
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
});
