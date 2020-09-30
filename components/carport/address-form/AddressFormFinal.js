import React, {useContext, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {AuthContext} from '../../../context/AuthContext';
import CarportRegistrationComplete from '../CarportRegistrationComplete';
import {withNavigation} from 'react-navigation';
import {initializeCarportWithParams} from '../../../firebase_func';

const AddressFormFinal = props => {
  const context = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const {
    setstage,
    address,
    type,
    features,
    availablespaces,
    parkinginstructions,
    description,
  } = props;

  const handleBack = () => {
    setstage(5);
  };

  const handleSubmit = async () => {
    const {user_id} = context;
    setloading('loading');
    const newport_id = await initializeCarportWithParams(
      user_id,
      address,
      availablespaces,
      features,
      type,
      parkinginstructions,
      description,
    );

    console.log('NEW CARPORT CREATED => ', newport_id);
    if (newport_id) {
      setloading('success');
      return;
    } else {
      setloading('fail');
      return;
    }
  };

  if (loading === 'loading') {
    return (
      <ScrollView contentContainerStyle={styles.formcontainer}>
        <ActivityIndicator />
      </ScrollView>
    );
  } else if (loading === 'success') {
    return <CarportRegistrationComplete />;
  }

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
          onPress={() => setstage(1)}
        />
        <ListItem
          chevron
          title={type}
          subtitle={'location type'}
          onPress={() => setstage(3)}
        />
        <ListItem
          chevron
          title={availablespaces}
          subtitle={'available spaces'}
          onPress={() => setstage(4)}
        />
        <ListItem
          chevron
          title={
            parkinginstructions === '' || parkinginstructions === null
              ? '(no parking instructions)'
              : parkinginstructions
          }
          subtitle={'parking instructions'}
          onPress={() => setstage(5)}
        />
        <ListItem
          chevron
          title={
            description === '' || description === null
              ? '(no additional info)'
              : description
          }
          subtitle={'additional info'}
          onPress={() => setstage(5)}
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
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formcontainer: {
    paddingBottom: 12,
    paddingVertical: 24,
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
  padding: {
    padding: 16,
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

export default withNavigation(AddressFormFinal);
