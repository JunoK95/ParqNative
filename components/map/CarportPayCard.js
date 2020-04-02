import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {
  convertToDollar,
  splitStrByComma,
  getPortMaxHours,
} from '../../helpers/helper';
import {withNavigation} from 'react-navigation';
import storeLogo from '../../resources/images/112.png';
import {checkCarportAvailablity} from '../../firebase_func/firestoreFunctions';
import {AuthContext} from '../../context/AuthContext';
import {chargeWallet} from '../../firebase_func/walletFunctions';
import moment from 'moment';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeaturesList from '../carport/FeaturesList';
import NewVehiclePicker from '../vehicle/NewVehiclePicker';
import NewPaymentPicker from '../../views/payment/NewPaymentPicker';
import CustomPicker from '../picker/CustomPicker';

const CarportPayCard = props => {
  const context = useContext(AuthContext);
  const {port, setopen} = props;
  const [selectcard, setselectcard] = useState(null);
  const [vehicle, setvehicle] = useState(null);
  const [hours, sethours] = useState(1);

  //For progress indication
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  //Calculating costs
  const amount = parseInt(
    parseFloat(port.price_hr) * parseInt(hours, 10) * 100,
    10,
  );
  const amountFee = 30 + parseInt(amount * 0.03, 10);
  const amountTax = parseInt(amount * 0.085, 10);
  const totalAmount = amount + amountFee + amountTax;
  const dollarAmount = (totalAmount / 100).toFixed(2);

  let maxHours = getPortMaxHours(port, 12);
  let hourItems = [];

  for (let i = 1; i <= maxHours; i++) {
    const itemamount = parseInt(
      parseFloat(port.price_hr) * parseInt(i, 10) * 100,
      10,
    );
    const itemamountTax = parseInt(itemamount * 0.085, 10);
    const itemDollarAmount = ((itemamount + itemamountTax) / 100).toFixed(2);
    hourItems.push({
      title: `${i} hours`,
      subtitle: 'total = $' + itemDollarAmount,
      value: i,
    });
  }

  console.log('hourItems', hourItems);

  const finalizePay = (_port, _vehicle, _price, _hours) => {
    _hours = parseInt(_hours, 10);
    if (_hours <= 0) {
      seterror('Invalid number of hours');
      return;
    }
    const startTime = moment().unix();
    const endTime = moment()
      .add(_hours, 'hours')
      .unix();
    context.functions
      .reserveCarport(
        _port.id,
        _port,
        startTime,
        endTime,
        _vehicle.id,
        _vehicle.data,
        _price,
        _hours,
      )
      .then(res => {
        console.log('transaction complete', res);
        setloading(false);
        props.navigation.navigate('ReservationList');
      })
      .catch(err => {
        setloading(false);
        console.error('transaction error', err);
      });
  };

  const handleClick = () => {
    if (setopen) {
      setopen(false);
    }
    props.navigation.navigate('CarportInfo', {port});
  };

  const handlePay = async () => {
    //check for missing parameters
    if (!selectcard || !vehicle || !hours) {
      seterror('Missing Requirements');
      return;
    }
    setloading(true);

    //check availablity
    const isAvailable = await checkCarportAvailablity(port).then(res => {
      return res;
    });
    if (!isAvailable) {
      seterror('This parking spot became unavailable');
      setloading(false);
      return;
    }

    //Perform checkout
    const {object} = selectcard;

    const resData = {
      token: selectcard.id,
      amount: amount + amountTax,
      port: port,
      description: `Test with vehicle ${vehicle.data.license_plate} and user ${
        context.user_id
      }`,
      metadata: {
        vehicle_license_plate: vehicle.data.license_plate,
        vehicle_owner_id: vehicle.data.owner_id,
        vehicle_us_state: vehicle.data.us_state,
        vehicle_year: vehicle.data.year,
        user_id: context.user_id,
        user_customer_id: context.user_data.stripe_customer_id,
        user_email: context.user_data.email,
        port_id: port.id,
        port_owner_id: port.owner_id,
        location_address: port.location.address,
        location_place_id: port.location.place_id,
        location_geohash: port.location.geohash,
        hours: hours,
        price_hr: port.price_hr,
        price_base: amount,
        price_stripe_fee: amountFee,
        price_tax: amountTax,
      },
    };

    if (object === 'wallet') {
      if (resData.amount > selectcard.credit) {
        seterror('insufficient funds');
        setloading(false);
        return;
      } else {
        chargeWallet(
          context.user_id,
          resData.amount,
          'purchase parking',
          'paid with wallet',
        ).then(res => {
          console.log('wallet charged =>  ', res);
          if (res) {
            finalizePay(port, vehicle, resData.amount, hours);
          }
        });
      }
    } else if (object === 'card') {
      Axios({
        method: 'POST',
        url:
          'https://us-central1-parq-dev.cloudfunctions.net/stripePayParkingCharge',
        data: resData,
      })
        .then(res => {
          finalizePay(port, vehicle, resData.amount, hours);
          console.log(res);
        })
        .catch(err => {
          setloading(false);
          seterror('Payment Failed');
          console.error(err);
        });
    } else {
      console.warn('Card Not Chosen');
      return;
    }
  };

  //DOM Returns
  if (!port) {
    return null;
  }

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

  if (port) {
    return (
      <View style={styles.container} onPress={handleClick}>
        {error && (
          <View style={styles.cardheader}>
            <Text style={styles.error}>{error}</Text>
          </View>
        )}
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
              <Text style={styles.distance}>{scheduleTxt}</Text>
              <Icon
                style={styles.icon}
                name={'information'}
                size={20}
                onPress={() => console.log('info')}
              />
            </View>
          </View>
        </View>
        <View style={styles.cardheader}>
          <View style={styles.left}>
            <Image style={styles.avatar} source={storeLogo} />
          </View>
          <FeaturesList features={port.accomodations} />
        </View>
        <View style={styles.selectsection}>
          <CustomPicker
            items={hourItems}
            initialitem={hourItems[0]}
            title={'Hours'}
            setselected={item => {
              sethours(item.value);
            }}
          />
          <NewVehiclePicker title={'Select Vehicle'} setselected={setvehicle} />
          <NewPaymentPicker
            title={'Select Payment'}
            setselected={setselectcard}
          />
        </View>
        <TouchableHighlight
          disabled={!vehicle || !selectcard || !hours || loading}
          style={
            !vehicle || !selectcard || !hours || loading
              ? styles.buttondisabled
              : styles.button
          }
          underlayColor={'#ffc630'}
          onPress={handlePay}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableHighlight>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    paddingVertical: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
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
  avatar: {
    width: 48,
    height: 48,
    marginLeft: 12,
  },
  error: {
    fontSize: 16,
    color: '#dd0000',
    textAlign: 'left',
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
  icon: {
    fontSize: 20,
    color: '#007AFF',
    textAlign: 'right',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  selectsection: {
    alignItems: 'flex-start',
    width: 300,
    padding: 0,
  },
  button: {
    paddingHorizontal: 80,
    paddingVertical: 8,
    backgroundColor: '#11a4ff',
    borderRadius: 20,
    margin: 8,
  },
  buttondisabled: {
    paddingHorizontal: 80,
    paddingVertical: 8,
    backgroundColor: '#11a4ff',
    opacity: 0.3,
    borderRadius: 20,
    margin: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  hourpicker: {
    width: 260,
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
});

export default withNavigation(CarportPayCard);
