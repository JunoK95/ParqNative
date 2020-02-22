import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';

const AddressForm4 = props => {
  const {setstage, setfeatures, setparkinginstructions} = props;
  const [selected, setselected] = useState({
    covered: false,
    ev_charging: false,
    valet: false,
    low_clearance: false,
    compact_only: false,
    no_reentry: false,
  });

  const [description, setdescription] = useState(null);

  const items = [
    {
      label: 'Covered',
      name: 'covered',
      color: '#11a4ff',
    },
    {
      label: 'EV Charging',
      name: 'ev_charging',
      color: '#11a4ff',
    },
    {
      label: 'Valet',
      name: 'valet',
      color: '#11a4ff',
    },
    {
      label: 'Low Clearance',
      name: 'low_clearance',
      color: '#fa8072',
    },
    {
      label: 'Compact Only',
      name: 'compact_only',
      color: '#fa8072',
    },
    {
      label: 'No Re-entry',
      name: 'no_reentry',
      color: '#fa8072',
    },
  ];

  const itemslist = items.map((item, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={
          selected[item.name]
            ? {...styles.listitemcontainerselect, backgroundColor: item.color}
            : styles.listitemcontainer
        }
        underlayColor={'#11a4ff'}
        onPress={() =>
          setselected({...selected, [item.name]: !selected[item.name]})
        }>
        <View style={styles.listitem}>
          <Text
            style={
              selected[item.name] ? styles.listtextselect : styles.listtext
            }>
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });

  const handleBack = () => {
    setstage(3);
  };

  const handleNext = () => {
    setfeatures(selected);
    setparkinginstructions(description);
    setstage(5);
  };

  return (
    <ScrollView contentContainerStyle={styles.formcontainer}>
      <View style={styles.titlecontainer}>
        <Text style={styles.titletext}>{'Select Location Features'}</Text>
      </View>
      <View style={styles.contentcontainer}>{itemslist}</View>
      <View style={styles.descontainer}>
        <Input
          label={'Parking Instructions'}
          multiline
          placeholder={'- Add any special instructions'}
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

export default AddressForm4;
