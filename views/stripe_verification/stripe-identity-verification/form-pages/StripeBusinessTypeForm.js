import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import RoundedButton from '../../../../components/button/RoundedButton';

const businessOptions = [
  {
    title: 'Individual',
    value: 'individual',
  },
  {
    title: 'Company / LLC / Partnership',
    value: 'company',
  },
  {
    title: 'Non Profit',
    value: 'non_profit',
  },
  {
    title: 'Goverment Entity (US Only)',
    value: 'government_entity',
  },
];

const StripeBusinessTypeForm = ({businessType, setBusinessType, nextPress}) => {
  const checkBoxes = businessOptions.map((item, i) => {
    const {title, value} = item;
    return (
      <CheckBox
        key={i}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        title={title}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={businessType === value}
        onPress={() => setBusinessType(value)}
      />
    );
  });

  return (
    <View>
      <Text style={styles.descriptionText}>
        Which of the following best describes you?
      </Text>
      {checkBoxes}
      <View style={styles.buttonContainer}>
        <RoundedButton
          fontSize={18}
          backgroundColor={'#11a4ff'}
          textColor={'white'}
          title={'Next >'}
          onPress={nextPress}
        />
      </View>
    </View>
  );
};

export default StripeBusinessTypeForm;

const styles = StyleSheet.create({
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  checkboxText: {
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 32,
  },
  buttonContainer: {
    paddingVertical: 32,
    paddingHorizontal: 64,
  },
});
