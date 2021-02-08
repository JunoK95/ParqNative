import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import CarportEditMenu from '../components/carport/carport-edit-menu/CarportEditMenu';
import HeaderPadding from '../components/header-padding/HeaderPadding';
import OrbLoading from '../components/loading/OrbLoading';
import {
  getCarportById,
  updateCarportData,
} from '../firebase_func/carportFunctions';
import {splitStrByComma} from '../helpers/helper';

const CarportEditView = props => {
  const {port, port_id, initial_stage} = props.navigation.state.params;
  const {isFocused} = props;
  const [portData, setPortData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCarportById(port_id);
      setPortData(data);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error('COULD NOT RETRIEVE DATA');
    }
  }, [port_id]);

  const updateData = useCallback(
    async data => {
      try {
        await updateCarportData(port_id, data);
        fetchData();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [port_id, fetchData],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, isFocused]);

  const splitAddress = splitStrByComma(port.location.address);

  if (loading) {
    return <OrbLoading />;
  } else {
    return (
      <View style={{flex: 1}}>
        <HeaderPadding title={splitAddress[0]} to={'CarportList'} />
        <CarportEditMenu
          port={portData}
          port_id={port_id}
          initial_stage={initial_stage}
          updateData={updateData}
        />
      </View>
    );
  }
};

export default withNavigationFocus(CarportEditView);
