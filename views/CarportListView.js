import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import HeaderPadding from '../components/layout/HeaderPadding';
import {getOwnedCarports} from '../firebase_func/firestoreFunctions';
import {ListItem, Icon} from 'react-native-elements';
import CarportCard2 from '../components/carport/CarportCard2';

const CarportListView = props => {
  const context = useContext(AuthContext);
  const [carports, setports] = useState([]);
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
    return <CarportCard2 key={i} port={c.data} />;
  });

  return (
    <View>
      <HeaderPadding
        to={'Home'}
        right={
          <TouchableOpacity
            onPress={() => props.navigation.navigate('CarportRegister')}>
            <Icon name={'add'} size={30} color={'#000'} />
          </TouchableOpacity>
        }
      />
      {fetching ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollcontainer}>
          {carportCardList}
          <ListItem
            title={'Register a property'}
            leftIcon={{name: 'add', color: '#000'}}
            onPress={() => props.navigation.navigate('CarportRegister')}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollcontainer: {
    alignItems: 'center',
  },
});

export default CarportListView;
