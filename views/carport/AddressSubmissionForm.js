import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import AddressForm from '../../components/carport/AddressForm';
import AddressForm2 from '../../components/carport/AddressForm2';
import AddressForm3 from '../../components/carport/AddressForm3';
import AddressForm4 from '../../components/carport/AddressForm4';
import AddressFormFinal from '../../components/carport/AddressFormFinal';
import AddressForm5 from '../../components/carport/AddressForm5';

const AddressSubmissionForm = () => {
  const [stage, setstage] = useState(1);

  const [address, setaddress] = useState(null);
  const [type, settype] = useState(null);
  const [features, setfeatures] = useState(null);
  const [availablespaces, setavailablespaces] = useState(null);
  const [parkinginstructions, setparkinginstructions] = useState(null);
  const [description, setdescription] = useState(null);

  if (stage === 1) {
    return (
      <View style={styles.container}>
        <AddressForm setaddress={setaddress} setstage={setstage} />
      </View>
    );
  } else if (stage === 2 && address) {
    return (
      <View style={styles.container}>
        <AddressForm2
          address={address}
          setaddress={setaddress}
          setstage={setstage}
        />
      </View>
    );
  } else if (stage === 3) {
    return (
      <View style={styles.container}>
        <AddressForm3 settype={settype} setstage={setstage} />
      </View>
    );
  } else if (stage === 4) {
    return (
      <View style={styles.container}>
        <AddressForm4
          setstage={setstage}
          setfeatures={setfeatures}
          setavailablespaces={setavailablespaces}
        />
      </View>
    );
  } else if (stage === 5) {
    return (
      <View style={styles.container}>
        <AddressForm5
          setstage={setstage}
          setparkinginstructions={setparkinginstructions}
          setdescription={setdescription}
        />
      </View>
    );
  } else if (stage === 6) {
    return (
      <View style={styles.container}>
        <AddressFormFinal
          setstage={setstage}
          address={address}
          type={type}
          features={features}
          availablespaces={availablespaces}
          parkinginstructions={parkinginstructions}
          description={description}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 64,
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
