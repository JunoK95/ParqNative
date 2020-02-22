import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import image1 from '../../resources/images/2.png';
import PaymentPicker from './PaymentPicker';
import {convertToDollar} from '../../helpers/helper';
import Axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import {createCoinPurchase} from '../../firebase_func/walletFunctions';
import PaymentActivityIndicator from './PaymentActivityIndicator';

const items = [
  {
    item_name: '100 coins',
    amount: 100,
    price: 99,
    img: image1,
  },
  {
    item_name: '500 coins',
    amount: 500,
    price: 499,
    img: image1,
  },
  {
    item_name: '2000 coins',
    amount: 2000,
    price: 1999,
    img: image1,
  },
  {
    item_name: '10000 coins',
    amount: 10000,
    price: 9999,
    img: image1,
  },
];

const AddBalanceMenu = props => {
  const {open, setopen} = props;
  const context = useContext(AuthContext);
  const [selectitem, setselectitem] = useState(items[0]);
  const [selectcard, setselectcard] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const menu = items.map((item, i) => {
    const dollarCost = convertToDollar(item.price / 100);
    return (
      <Picker.item
        key={i}
        label={`($${dollarCost}) ${item.item_name}`}
        value={item}
      />
    );
  });

  const handleSubmit = async () => {
    console.log(
      'submit with select => ',
      selectitem,
      'and card =>',
      selectcard,
    );
    setloading(true);
    const resData = {
      amount: selectitem.price,
      description: `Purchase ${selectitem.amount} coins for ${context.user_id}`,
      token: selectcard.id,
    };
    await Axios({
      method: 'post',
      url:
        'https://us-central1-parq-alpha.cloudfunctions.net/stripeElementCharge',
      data: resData,
    })
      .then(res => {
        console.log(res);
        createCoinPurchase(context.user_id, selectitem.amount, res.data)
          .then(() => {
            setloading('success');
          })
          .catch(err => {
            console.error(err);
            setloading(false);
          });
      })
      .catch(err => {
        setloading(false);
        seterror('Payment Failed');
        console.error(err);
      });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        console.log('close');
      }}>
      <View style={styles.bg}>
        <View style={styles.container}>
          {error && <Text>{error}</Text>}
          {loading ? (
            <PaymentActivityIndicator loading={loading} setopen={setopen} />
          ) : (
            <React.Fragment>
              <ScrollView>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Select desired amount</Text>
                </View>
                <Image style={styles.image} source={image1} />
                <Text style={styles.pickerLabel}>Amount</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={selectitem}
                  onValueChange={(itemValue, itemIndex) => {
                    setselectitem(itemValue);
                  }}>
                  {menu}
                </Picker>
                <PaymentPicker setselectcard={setselectcard} />
              </ScrollView>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setopen(false)}>
                  <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    margin: 32,
    marginVertical: 80,
  },
  header: {
    margin: 24,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  picker: {
    marginHorizontal: 24,
  },
  pickerLabel: {
    marginHorizontal: 24,
    color: '#555',
  },
  image: {
    height: 128,
    width: 128,
    marginBottom: 24,
    alignSelf: 'center',
  },
  button: {
    padding: 8,
  },
  buttonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  footer: {
    margin: 12,
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  },
});

export default AddBalanceMenu;
