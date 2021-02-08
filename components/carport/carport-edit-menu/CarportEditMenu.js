import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ExpandableListItem from '../../expandable-list-item/ExpandableListItem';
import CustomListItem from '../../layout/CustomListItem';
import CarportEditAccomodations from './carport-edit-forms/CarportEditAccomodations';
import CarportEditDescription from './carport-edit-forms/CarportEditDescription';
import CarportEditParkingInstructions from './carport-edit-forms/CarportEditParkingInstructions';
import CarportSetSchedule from './carport-edit-forms/CarportSetSchedule';

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
  {
    title: 'Adjust Schedule',
    value: 'schedule',
    subtitle: 'Set A Weekly Schedule',
    leftIcon: 'calendar',
    leftIconColor: 'black',
  },
];

const CarportEditMenu = ({port, port_id, updateData, initial_stage}) => {
  const [stage, setStage] = useState(initial_stage ? initial_stage : 'home');

  useEffect(() => {
    setStage(initial_stage ? initial_stage : 'home');
  }, [port, initial_stage]);

  const handleBack = useCallback(() => {
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
          handleBack={handleBack}
        />
      );
      break;
    case 'description':
      stageComponent = (
        <CarportEditDescription
          defaultValue={port.description}
          updateData={updateData}
          handleBack={handleBack}
        />
      );
      break;
    case 'accomodations':
      stageComponent = (
        <CarportEditAccomodations
          defaultValue={port.accomodations}
          updateData={updateData}
          handleBack={handleBack}
        />
      );
      break;
    case 'schedule':
      stageComponent = (
        <CarportSetSchedule
          defaultValue={'nothing'}
          port_id={port_id}
          updateData={updateData}
          handleBack={handleBack}
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
