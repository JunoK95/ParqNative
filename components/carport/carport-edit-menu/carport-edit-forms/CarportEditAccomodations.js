import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RoundedButton from '../../../button/RoundedButton';

const items = [
  {
    label: 'Covered',
    name: 'covered_space',
    color: '#11a4ff',
  },
  {
    label: 'EV Charging',
    name: 'ev_charging',
    color: '#11a4ff',
  },
  {
    label: 'Parallel',
    name: 'parallel',
    color: '#fa8072',
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

const CarportEditAccomodations = ({handleBack, updateData, defaultValue}) => {
  const [loading, setLoading] = useState(false);
  const [selected, setselected] = useState({...defaultValue});

  console.log('defaultValues', defaultValue);

  const handleSubmit = async () => {
    setLoading(true);
    const success = await updateData({accomodations: {...selected}});
    console.log('DATA UPDATED =>', success);
    if (success) {
      setLoading(false);
      handleBack();
    } else {
      setLoading(false);
    }
  };

  const itemslist = items.map((item, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={
          selected[item.name]
            ? {...styles.listitemContainerselect, backgroundColor: item.color}
            : styles.listitemContainer
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

  return (
    <View style={styles.formContainer}>
      <View style={styles.contentContainer}>{itemslist}</View>
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <RoundedButton
            title={'Back'}
            backgroundColor={'transparent'}
            fontSize={16}
            onPress={handleBack}
          />
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
            disabled={loading}
            title={'Submit'}
            backgroundColor={'#11a4ff'}
            fontSize={16}
            textColor={'white'}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default CarportEditAccomodations;

const styles = StyleSheet.create({
  formContainer: {
    padding: 36,
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  listitemContainer: {
    width: 144,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginVertical: 4,
  },
  listitemContainerselect: {
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
  buttonContainer: {
    minWidth: 80,
    marginHorizontal: 8,
  },
});
