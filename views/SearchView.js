import React from 'react';
import {View} from 'react-native';
import HeaderPadding from '../components/layout/HeaderPadding';
import LocationAutoComplete from '../components/search/LocationAutocomplete';
import {config} from '../config';

const SearchView = props => {
  console.log('Config', config);
  return (
    <View>
      <HeaderPadding navigation={props.navigation} to={'Home'} />
      <LocationAutoComplete />
    </View>
  );
};

export default SearchView;
