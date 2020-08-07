import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Keyboard, ScrollView, KeyboardAvoidingView} from 'react-native';
import {
  AddressForm,
  AddressForm2,
  AddressForm3,
  AddressForm4,
  AddressForm5,
  AddressFormFinal,
} from '../../components/carport/address-form/index';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const AddressSubmissionForm = () => {
  const [stage, setstage] = useState(1);

  const [address, setaddress] = useState(null);
  const [type, settype] = useState(null);
  const [features, setfeatures] = useState(null);
  const [availablespaces, setavailablespaces] = useState(null);
  const [parkinginstructions, setparkinginstructions] = useState(null);
  const [description, setdescription] = useState(null);

  let form;

  if (stage === 1) {
    form = <AddressForm setaddress={setaddress} setstage={setstage} />;
  } else if (stage === 2 && address) {
    form = (
      <AddressForm2
        address={address}
        setaddress={setaddress}
        setstage={setstage}
      />
    );
  } else if (stage === 3) {
    form = <AddressForm3 settype={settype} setstage={setstage} />;
  } else if (stage === 4) {
    form = (
      <AddressForm4
        setstage={setstage}
        setfeatures={setfeatures}
        setavailablespaces={setavailablespaces}
      />
    );
  } else if (stage === 5) {
    form = (
      <AddressForm5
        setstage={setstage}
        setparkinginstructions={setparkinginstructions}
        setdescription={setdescription}
      />
    );
  } else if (stage === 6) {
    form = (
      <AddressFormFinal
        setstage={setstage}
        address={address}
        type={type}
        features={features}
        availablespaces={availablespaces}
        parkinginstructions={parkinginstructions}
        description={description}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={styles.flexscreen}>{form}</ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flexscreen: {
    flex: 1,
    paddingTop: 64,
  },
  container: {
    width: Dimensions.get('window').width - 48,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default AddressSubmissionForm;
