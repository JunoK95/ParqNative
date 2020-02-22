import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {ListItem} from 'react-native-elements';

const AddressForm3 = props => {
  const {setstage, settype} = props;
  const handlePress = type => {
    settype(type);
    setstage(4);
  };

  const handleBack = () => {
    setstage(2);
  };

  return (
    <View style={styles.formcontainer}>
      <View style={styles.titlecontainer}>
        <Text style={styles.titletext}>
          {'What best describes this location?'}
        </Text>
      </View>
      <ListItem
        chevron
        title={'Driveway'}
        leftIcon={{name: 'theaters', color: '#11a4ff'}}
        onPress={() => handlePress('driveway')}
      />
      <ListItem
        chevron
        title={'Garage'}
        leftIcon={{name: 'home', color: '#11a4ff'}}
        onPress={() => handlePress('garage')}
      />
      <ListItem
        chevron
        title={'Parking Lot'}
        leftIcon={{name: 'local-parking', color: '#11a4ff'}}
        onPress={() => handlePress('parkinglot')}
      />
      <ListItem
        chevron
        title={'Structure'}
        leftIcon={{name: 'domain', color: '#11a4ff'}}
        onPress={() => handlePress('structure')}
      />
      <View style={styles.buttonrow}>
        <TouchableHighlight
          style={styles.nobutton}
          underlayColor={'#ffc630'}
          onPress={handleBack}>
          <Text style={styles.nobuttonText}>Back</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formcontainer: {
    padding: 32,
    paddingHorizontal: 24,
  },
  titlecontainer: {
    paddingBottom: 24,
  },
  titletext: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
  },
  buttonrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
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
});

export default AddressForm3;
