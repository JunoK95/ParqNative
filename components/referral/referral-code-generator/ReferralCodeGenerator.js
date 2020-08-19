import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomListItem from '../../layout/CustomListItem';
import {AuthContext} from '../../../context/AuthContext';

const ReferralCodeGenerator = () => {
  const context = useContext(AuthContext);
  const [refcode, setrefcode] = useState(context.user_data.referral_code);
  const handlePress = async () => {
    try {
      const code = await context.functions.contextGenerateReferralCode();
      setrefcode(code);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CustomListItem
      title={refcode ? refcode : 'Generate Referral Code'}
      subtitle={'Your Referral Code'}
      handlePress={handlePress}
    />
  );
};

export default ReferralCodeGenerator;

const styles = StyleSheet.create({});
