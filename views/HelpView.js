import React, {useContext} from 'react';
import {StyleSheet, View, Linking} from 'react-native';
import HeaderPadding from '../components/header-padding/HeaderPadding';
import CustomListItem from '../components/layout/CustomListItem';
import {withNavigation} from 'react-navigation';
import {AuthContext} from '../context/AuthContext';

const HelpView = props => {
  const context = useContext(AuthContext);
  const navigateTo = screen => {
    props.navigation.navigate(screen);
  };

  const contactPress = () => {
    Linking.openURL(
      `mailto:parq.tech@gmail.com?subject=Message from ${
        context.user_data.email
      }`,
    );
  };

  return (
    <View>
      <HeaderPadding to={'Home'} title={'Help'} alt />
      <CustomListItem
        title={'FAQs'}
        icon={'question-circle'}
        handlePress={() => navigateTo('FAQ')}
      />
      <CustomListItem
        title={'Contact Us'}
        icon={'envelope'}
        handlePress={() => contactPress()}
      />
      <CustomListItem
        title={'Terms of Service'}
        icon={'scroll'}
        handlePress={() => navigateTo('TOS')}
      />
      <CustomListItem
        title={'Privacy Policy'}
        icon={'user-shield'}
        handlePress={() => navigateTo('Privacy')}
      />
      <CustomListItem
        title={'Phone'}
        icon={'user-shield'}
        handlePress={() => navigateTo('Phone')}
      />
    </View>
  );
};

export default withNavigation(HelpView);

const styles = StyleSheet.create({});
