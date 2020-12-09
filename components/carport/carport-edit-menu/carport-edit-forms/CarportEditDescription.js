import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import RoundedButton from '../../../button/RoundedButton';

const CarportEditDescription = ({defaultValue, handleBack, updateData}) => {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const success = await updateData({description: value});
    console.log('DATA UPDATED =>', success);
    if (success) {
      setLoading(false);
      handleBack();
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Input
          label={'Description'}
          inputStyle={styles.input}
          multiline={true}
          placeholder={'Add any helpful descriptions here'}
          value={value}
          onChangeText={text => {
            if (text.length <= 280) {
              setValue(text);
            }
          }}
        />
      </View>
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
            title={'Submit'}
            disabled={loading}
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

export default CarportEditDescription;

const styles = StyleSheet.create({
  formContainer: {
    padding: 36,
    flex: 1,
  },
  inputContainer: {
    paddingBottom: 48,
  },
  input: {minHeight: 150},
  buttonContainer: {
    flex: 1,
  },
  buttonrow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 148,
  },
});
