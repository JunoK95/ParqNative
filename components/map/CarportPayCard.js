import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  ScrollView,
} from 'react-native';
import {getPortMaxHours} from '../../helpers/helper';
import {withNavigation} from 'react-navigation';
import storeLogo from '../../resources/images/112.png';
import {AuthContext} from '../../context/AuthContext';
import {chargeWallet} from '../../firebase_func/walletFunctions';
import moment from 'moment';
import VehiclePicker from '../vehicle/vehicle-picker';
import NewPaymentPicker from '../../views/payment/NewPaymentPicker';
import {stripePayParkingWithCard} from '../../api/stripe_index';
import CardTokenGenerator from '../../views/payment/card-token-generator/CardTokenGenerator';
import VehicleRegisterModal from '../vehicle/vehicle-register-modal/VehicleRegisterModal';
import {checkCarportAvailablity, createReservation} from '../../firebase_func';
import CustomPricePicker from '../picker/price-picker/CustomPricePicker';
import OrbLoading from '../loading/OrbLoading';
import CarportPayBill from './CarportPayBill';
import {useEffect} from 'react';
import {calculateParkingPrices} from '../../api/parking_payment_functions';
import {useCallback} from 'react';
import CarportPayCardHeader from './CarportPayCardHeader';
import { formatISOWeekday } from '../../helpers/format-isoweekday';

const CarportPayCard = ({port, port_id, setopen, navigation, schedule}) => {
  const context = useContext(AuthContext);
  const {user_id, user_data} = context;
  const [selectcard, setselectcard] = useState(null);
  const [vehicle, setvehicle] = useState(null);
  const [hours, sethours] = useState(1);

  //For progress indication
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const [openGen, setopenGen] = useState(false);
  const [vmodal, setvmodal] = useState(false);

  const [prices, setPrices] = useState();

  let maxHours = getPortMaxHours(port, formatISOWeekday(new Date()), 12);

  const fetchParkingPrices = useCallback(async () => {
    setPrices('loading');
    const parking_prices = await calculateParkingPrices(port_id, hours);
    setPrices(parking_prices);
  }, [hours, port_id]);

  useEffect(() => {
    fetchParkingPrices();
  }, [fetchParkingPrices, hours]);

  const finalizePay = async () => {
    if (hours <= 0) {
      seterror('Invalid number of hours');
      return;
    }
    const startTime = moment().unix();
    const endTime = moment()
      .add(hours, 'hours')
      .unix();

    console.log('PORT ID =>', port_id);

    const reservationSuccess = await createReservation(
      user_id,
      user_data,
      port_id,
      port,
      startTime,
      endTime,
      vehicle.id,
      vehicle.data,
      prices.total_price,
      hours,
    );

    if (reservationSuccess) {
      console.log('transaction complete');
      setloading(false);
      navigation.navigate('ReservationList');
    } else {
      setloading(false);
      console.error('transaction error');
    }
  };

  const handlePay = async () => {
    //check for missing parameters
    if (!selectcard || !vehicle || !hours) {
      seterror('Missing Requirements');
      return;
    }
    setloading(true);

    //check availablity
    const isAvailable = await checkCarportAvailablity(port, port_id);
    if (!isAvailable) {
      seterror('This parking spot became unavailable');
      setloading(false);
      return;
    }

    //Perform checkout
    const {object} = selectcard;

    if (object === 'wallet') {
      if (prices.total_price > selectcard.credit) {
        seterror('insufficient funds');
        setloading(false);
        return;
      } else {
        chargeWallet(
          context.user_id,
          prices.total_price,
          'purchase parking',
          'paid with wallet',
        ).then(res => {
          console.log('wallet charged =>  ', res);
          if (res) {
            finalizePay();
          }
        });
      }
    } else if (object === 'card') {
      const result = await stripePayParkingWithCard(
        user_id,
        user_data,
        prices,
        hours,
        port,
        user_data.stripe_customer_id,
        vehicle,
        selectcard.id,
      );
      if (result.error) {
        setloading(false);
        seterror('Payment Failed');
        return;
      } else {
        finalizePay();
        return;
      }
    } else {
      console.warn('Card Not Chosen');
      return;
    }
  };

  //DOM Returns
  if (!port) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loadingcontainer}>
        <OrbLoading />
      </View>
    );
  }
  if (port) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {error && (
          <View style={styles.cardheader}>
            <Text style={styles.error}>{error}</Text>
          </View>
        )}
        <CarportPayCardHeader
          price_hr={port.price_hr}
          accomodations={port.accomodations}
          image_src={storeLogo}
          port={port}
          schedule={schedule}
        />
        <View style={styles.selectsection}>
          <CustomPricePicker
            title={'Hours'}
            price_hr={port.price_hr}
            max_hours={maxHours}
            setselected={item => {
              sethours(item.value);
            }}
          />
          <VehiclePicker
            title={'Select Vehicle'}
            setselected={setvehicle}
            setopen={setvmodal}
          />
          <VehicleRegisterModal open={vmodal} setopen={setvmodal} />
          <NewPaymentPicker
            title={'Select Payment'}
            setselected={setselectcard}
            setopenGen={setopenGen}
          />
          <CardTokenGenerator open={openGen} setopen={setopenGen} />
        </View>
        <CarportPayBill prices={prices} />
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
      </ScrollView>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    paddingVertical: 8,
    marginTop: 24,
    borderColor: '#11a4ff',
    borderWidth: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 24,
  },
  loadingcontainer: {
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').height - 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardheader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  error: {
    fontSize: 16,
    color: '#dd0000',
    textAlign: 'left',
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
});

export default withNavigation(CarportPayCard);
