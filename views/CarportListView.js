import React, {useContext, useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import HeaderPadding from '../components/layout/HeaderPadding';
import {
  getOwnedCarports,
  batchUpdateCarportData,
} from '../firebase_func/firestoreFunctions';
import {ListItem} from 'react-native-elements';

const CarportListView = props => {
  const context = useContext(AuthContext);
  const [carports, setports] = useState([]);

  const [changed, setchanged] = useState(null);
  const [fetching, setfetch] = useState(true);
  const [loading, setload] = useState(false);

  const {user_id} = context;

  useEffect(() => {
    setfetch(true);
    getOwnedCarports(user_id).then(res => {
      setports(res);
      setfetch(false);
    });
  }, [user_id]);

  const carportCardList = carports.map((c, i) => {
    return (
      <ListItem
        key={i}
        title={c.id}
        onPress={() => props.navigation.navigate('CarportEdit', {carport: c})}
      />
    );
  });

  return (
    <View>
      <HeaderPadding to={'Home'} />
      {fetching ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
          {carportCardList}
          <ListItem
            title={'Register a property'}
            leftIcon={{name: 'add', color: '#000'}}
            onPress={() => props.navigation.navigate('CarportRegister')}
          />
        </React.Fragment>
      )}
    </View>
  );
};

export default CarportListView;
