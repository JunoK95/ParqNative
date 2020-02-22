import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import ProfilePicture from '../components/profile/ProfilePicture';
import {AuthContext} from '../context/AuthContext';
import {ListItem} from 'react-native-elements';
import moment from 'moment';

const UserProfileView = () => {
  const context = useContext(AuthContext);
  const {display_name, date_joined, contact} = context.user_data;

  const formattedDate = moment.unix(date_joined).format('ll');

  const handleEditItem = () => {
    console.log('edit');
  };

  return (
    <View>
      <HeaderPadding to={'Home'} />
      <ProfilePicture />
      <ListItem style={styles.list_item} title={formattedDate} />
      <ListItem
        style={styles.list_item}
        title={display_name}
        onPress={handleEditItem}
        chevron
      />
      <ListItem
        style={styles.list_item}
        title={contact.email === '' ? 'No Email' : contact.email}
        onPress={handleEditItem}
        chevron
      />
      <ListItem
        style={styles.list_item}
        title={contact.phone === '' ? 'No Phone' : contact.phone}
        onPress={handleEditItem}
        chevron
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list_item: {},
});

export default UserProfileView;
