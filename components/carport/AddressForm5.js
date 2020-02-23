import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {Input} from 'react-native-elements';

const AddressForm5 = props => {
  const {setstage, setdescription, setparkinginstructions} = props;
  const [parkinput, setparkinput] = useState('');
  const [descinput, setdescinput] = useState('');

  const handleBack = () => {
    setstage(4);
  };

  const handleNext = () => {
    setparkinginstructions(parkinput);
    setdescription(descinput);
    setstage(6);
  };

  return (
    <ScrollView contentContainerStyle={styles.formcontainer}>
      <View style={styles.titlecontainer}>
        <Text style={styles.titletext}>{'Additional Information'}</Text>
      </View>
      <View style={styles.descontainer}>
        <Input
          label={'Parking Instructions'}
          multiline
          placeholder={'- Add any special instructions'}
          value={parkinput}
          onChangeText={text => {
            if (text.length <= 280) {
              setparkinput(text);
            }
          }}
        />
      </View>
      <View style={styles.descontainer}>
        <Input
          label={'Additional Info'}
          multiline
          placeholder={'- Add any other useful info'}
          value={descinput}
          onChangeText={text => {
            if (text.length <= 280) {
              setdescinput(text);
            }
          }}
        />
      </View>
      <View style={styles.buttonrow}>
        <TouchableHighlight
          style={styles.nobutton}
          underlayColor={'#ffc630'}
          onPress={handleBack}>
          <Text style={styles.nobuttonText}>Back</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor={'#ffc630'}
          onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
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
  contentcontainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  listitemcontainer: {
    width: 144,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginVertical: 4,
  },
  listitemcontainerselect: {
    width: 144,
    backgroundColor: '#11a4ff',
    borderRadius: 20,
    marginVertical: 4,
  },
  listitem: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  listicon: {
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  listtext: {
    color: '#777',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  listtextselect: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  descontainer: {
    paddingBottom: 36,
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

export default AddressForm5;
