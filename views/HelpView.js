import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import CustomListItem from '../components/layout/CustomListItem';
import {withNavigation} from 'react-navigation';

const HelpView = props => {
  const navigateTo = screen => {
    props.navigation.navigate(screen);
  };

  return (
    <View>
      <HeaderPadding to={'Home'} title={'Help'} alt />
      <CustomListItem
        title={'FAQs'}
        icon={'question-circle'}
        handlePress={() => navigateTo('FAQ')}
      />
      <CustomListItem title={'Contact Us'} icon={'envelope'} />
      <CustomListItem
        title={'Terms of Service'}
        icon={'scroll'}
        handlePress={() => navigateTo('TOS')}
      />
      <CustomListItem title={'Privacy Policy'} icon={'user-shield'} />
    </View>
  );
};

export default withNavigation(HelpView);

const styles = StyleSheet.create({});
