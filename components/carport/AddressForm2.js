import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {splitStrByComma} from '../../helpers/helper';

const AddressForm2 = props => {
  const {address, setstage, setaddress} = props;
  const handleNo = () => {
    setaddress(null);
    setstage(1);
  };

  const handleYes = () => {
    setstage(3);
  };

  if (address) {
    const splitAddress = splitStrByComma(address.formatted_address);

    return (
      <View style={styles.formcontainer}>
        <View style={styles.titlecontainer}>
          <Text style={styles.titletext}>{'Is this address correct?'}</Text>
        </View>
        <View style={styles.addresscontainer}>
          <Text style={styles.addresstext}>{splitAddress[0] + ','}</Text>
          <Text style={styles.addresstext}>
            {`${splitAddress[1]}, ${splitAddress[2]}, ${splitAddress[3]}`}
          </Text>
        </View>
        <View style={styles.buttonrow}>
          <TouchableHighlight
            style={styles.nobutton}
            underlayColor={'#ffc630'}
            onPress={handleNo}>
            <Text style={styles.nobuttonText}>No</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor={'#ffc630'}
            onPress={handleYes}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  formcontainer: {
    padding: 32,
    paddingHorizontal: 24,
  },
  addressContainer: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  addresstext: {
    textAlign: 'center',
    fontSize: 17,
  },
  nobutton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 48,
    backgroundColor: '#fff',
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 20,
    margin: 8,
  },
  nobuttonText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 48,
    backgroundColor: '#11a4ff',
    borderColor: '#11a4ff',
    borderWidth: 2,
    borderRadius: 20,
    margin: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  buttonrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
  buttoncontainer: {
    minWidth: 80,
    marginHorizontal: 8,
  },
  titlecontainer: {
    paddingBottom: 24,
  },
  titletext: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
  },
});

export default AddressForm2;
