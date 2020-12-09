import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ExpandableListItem from '../../expandable-list-item/ExpandableListItem';
import CustomListItem from '../../layout/CustomListItem';
import CarportEditAccomodations from './carport-edit-forms/CarportEditAccomodations';
import CarportEditDescription from './carport-edit-forms/CarportEditDescription';
import CarportEditParkingInstructions from './carport-edit-forms/CarportEditParkingInstructions';

const menuItems = [
  {
    title: 'Parking Instructions',
    value: 'parking_instructions',
    subtitle: 'Click To Edit',
    leftIcon: 'parking',
    leftIconColor: 'black',
  },
  {
    title: 'Description',
    value: 'description',
    subtitle: 'Click To Edit',
    leftIcon: 'info-circle',
    leftIconColor: 'black',
  },
  {
    title: 'Accomodations & Restrictions',
    value: 'accomodations',
    subtitle: 'Click To Edit',
    leftIcon: 'grip-horizontal',
    leftIconColor: 'black',
  },
];

const CarportEditMenu = ({port, updateData}) => {
  const [stage, setStage] = useState('home');

  useEffect(() => {
    setStage('home');
  }, []);

  const menuList = menuItems.map((item, i) => {
    const {title, value, subtitle, leftIcon, leftIconColor} = item;
    return (
      <CustomListItem
        key={i}
        title={title}
        subtitle={subtitle}
        icon={leftIcon}
        iconColor={leftIconColor}
        handlePress={() => {
          setStage(value);
        }}
      />
    );
  });

  let stageComponent;

  switch (stage) {
    case 'home':
      stageComponent = menuList;
      break;
    case 'parking_instructions':
      stageComponent = (
        <CarportEditParkingInstructions
          defaultValue={port.parking_instructions}
          updateData={updateData}
          handleBack={() => setStage('home')}
        />
      );
      break;
    case 'description':
      stageComponent = (
        <CarportEditDescription
          defaultValue={port.description}
          updateData={updateData}
          handleBack={() => setStage('home')}
        />
      );
      break;
    case 'accomodations':
      stageComponent = (
        <CarportEditAccomodations
          defaultValue={port.accomodations}
          updateData={updateData}
          handleBack={() => setStage('home')}
        />
      );
      break;
    default:
      stageComponent = menuList;
      break;
  }
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
      {stageComponent}
    </ScrollView>
  );
};

export default CarportEditMenu;

const styles = StyleSheet.create({});
