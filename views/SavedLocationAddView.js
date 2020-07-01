import React from 'react';
import {View} from 'react-native';
import AddSavedLocationForm from '../components/saved_locations/AddSavedLocationForm';
import HeaderPadding from '../components/header-padding/HeaderPadding';

const SavedLocationAddView = () => {
  return (
    <View>
      <HeaderPadding to={'SavedLocations'} />
      <AddSavedLocationForm />
    </View>
  );
};

export default SavedLocationAddView;
