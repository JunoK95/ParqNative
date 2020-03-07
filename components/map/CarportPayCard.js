import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {convertToDollar, splitStrByComma} from '../../helpers/helper';
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

const items = [
  {
    title: '1 hour',
    value: 1,
  },
  {
    title: '2 hours',
    value: 2,
  },
  {
    title: '3 hours',
    value: 3,
  },
  {
    title: '4 hours',
    value: 4,
  },
  {
    title: '5 hours',
    value: 5,
  },
  {
    title: '6 hours',
    value: 6,
  },
  {
    title: '7 hours',
    value: 7,
  },
  {
    title: '8 hours',
    value: 8,
  },
];

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
        props.navigation.navigate('ReservationList');
        setloading(false);
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
      amount: amount + amountFee + amountTax,
      description: `Test with vehicle ${vehicle.data.license_plate} and user ${
        context.user_id
      }`,
      metadata: port.id,
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
            finalizePay(port, vehicle, dollarAmount, hours);
          }
        });
      }
    } else if (object === 'card') {
      Axios({
        method: 'post',
        url:
          'https://us-central1-parq-dev.cloudfunctions.net/stripeElementCharge',
        data: resData,
      })
        .then(res => {
          finalizePay(port, vehicle, dollarAmount, hours);
          console.log(res);
        })
        .catch(err => {
          setloading(false);
          seterror('Payment Failed');
          console.error(err);
        });
    }
  };

  //DOM Returns
  if (!port) {
    return null;
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
            items={items}
            initialitem={items[0]}
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
          // onPress={() => console.log(hours, vehicle, selectcard)}>
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
    margin: 36,
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
