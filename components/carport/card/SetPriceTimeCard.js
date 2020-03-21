import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {splitStrByComma, convertToDollar} from '../../../helpers/helper';
import {activateCarport} from '../../../firebase_func/firestoreFunctions';
import CustomDatePicker from '../../picker/CustomDatePicker';
import CustomTextInput from '../../picker/CustomTextInput';
import moment from 'moment';

const SetPriceTimeCard = props => {
  const {port, port_id, setactive, refreshData} = props;
  const [price, setprice] = useState(port.price_hr);
  const [endtime, setendtime] = useState(null);
  const [spaces, setspaces] = useState(port.available_spaces);

  console.log('PORT DATA => ', port.available_spaces);
  const handleSubmit = async () => {
    if (port_id) {
      const updates = {
        timer_end: moment(endtime).unix(),
        available_spaces: spaces,
        price_hr: price,
      };
      const success = await activateCarport(port_id, updates);
      if (success) {
        setactive(false);
        refreshData();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.doublecontentcontainer}>
        <View style={styles.item}>
          <View style={styles.contentrow}>
            <View style={styles.left}>
              <Text style={styles.price}>
                {'$' + convertToDollar(price) + '/hr'}
              </Text>
            </View>
            <TouchableOpacity>
              <View style={styles.right}>
                <CustomTextInput
                  title={'Change Price'}
                  initialitem={price}
                  setselected={setprice}
                  inputType={'dollar'}
                />
              </View>
            </TouchableOpacity>
          </View>
          {endtime ? (
            <View style={styles.contentrow}>
              <View style={styles.left}>
                <Text style={styles.price} numberOfLines={1}>
                  {moment(endtime).calendar()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setendtime(null)}>
                <View style={styles.right}>
                  <Text style={styles.linktextred}>Cancel Timer</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.contentrow}>
              <View style={styles.left}>
                <Text style={styles.price}>{'No Timer'}</Text>
              </View>
              <TouchableOpacity>
                <View style={styles.right}>
                  <CustomDatePicker
                    title={'Set Timer'}
                    dateType={'datetime'}
                    minimumDate={new Date()}
                    // initialDate={new Date()}
                    setselected={setendtime}
                    openmodalbutton={
                      <Text style={styles.linktext}>Change Timer</Text>
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.contentrow}>
            <View style={styles.left}>
              <Text style={styles.price}>{spaces}</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.right}>
                <CustomTextInput
                  title={'Add Spaces'}
                  setselected={setspaces}
                  inputType={'number'}
                  initialitem={spaces}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttonrow}>
        <View style={styles.row}>
          <TouchableHighlight
            style={styles.buttonhalf2}
            underlayColor={'#ffc630'}
            onPress={() => setactive(false)}>
            <Text style={styles.buttonTextdisabled2}>Back</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonhalf}
            underlayColor={'#ffc630'}
            onPress={() => handleSubmit()}>
            <Text style={styles.buttonTextdisabled}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default SetPriceTimeCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 64,
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
  doublecontentcontainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  row: {
    flexDirection: 'row',
  },
  contentrow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemtext: {
    fontSize: 24,
    fontFamily: 'Montserrat',
  },
  linktext: {
    fontSize: 16,
    color: '#11a4ff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  linktextred: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
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
  buttonrow: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  buttondisabled: {
    width: 220,
    paddingVertical: 8,
    backgroundColor: '#11a4ff',
    borderRadius: 20,
  },
  buttonTextdisabled: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  buttonTextdisabled2: {
    textAlign: 'center',
    fontSize: 16,
    color: '#11a4ff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  itembutton: {
    width: 100,
    paddingVertical: 4,
    marginHorizontal: 6,
    marginVertical: 3,
    backgroundColor: '#fff',
    borderColor: '#11a4ff',
    borderRadius: 20,
    borderWidth: 2,
  },
  itembuttontext: {
    textAlign: 'center',
    fontSize: 14,
    color: '#11a4ff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  buttonhalf: {
    width: 100,
    paddingVertical: 8,
    marginHorizontal: 6,
    backgroundColor: '#11a4ff',
    borderRadius: 20,
  },
  buttonhalf2: {
    width: 100,
    paddingVertical: 8,
    marginHorizontal: 6,
    backgroundColor: '#fff',
    borderColor: '#11a4ff',
    borderRadius: 20,
    borderWidth: 2,
  },
});
