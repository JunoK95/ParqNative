import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {Input, ListItem} from 'react-native-elements';

const AddressForm5 = props => {
  const {setstage, address, type, features, parkinginstructions} = props;

  const [description, setdescription] = useState(null);

  const handleBack = () => {
    setstage(4);
  };

  const handleNext = () => {
    setstage(5);
  };

  return (
    <ScrollView contentContainerStyle={styles.formcontainer}>
      <View style={styles.titlecontainer}>
        <Text style={styles.titletext}>{'Review Submission'}</Text>
      </View>
      <View>
        <ListItem
          chevron
          title={address.formatted_address}
          subtitle={'address'}
        />
        <ListItem chevron title={type} subtitle={'location type'} />
        <ListItem
          chevron
          title={
            parkinginstructions === '' || parkinginstructions === null
              ? '(no parking instructions)'
              : parkinginstructions
          }
          subtitle={'parking instructions'}
        />
        <View style={{padding: 16}} />
        <Input
          label={'Additional Descriptions'}
          multiline
          placeholder={'(optional)'}
          value={description}
          onChangeText={text => {
            if (text.length <= 280) {
              setdescription(text);
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
          onPress={handleBack}>
          <Text style={styles.buttonText}>Submit</Text>
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
    paddingTop: 36,
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
    width: 130,
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
    width: 130,
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
