import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import HeaderPadding from '../components/layout/HeaderPadding';
import {getOwnedCarports} from '../firebase_func/firestoreFunctions';
import {Icon} from 'react-native-elements';
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
    return <CarportCard2 key={i} port={c.data} port_id={c.id} />;
  });

  return (
    <View>
      <HeaderPadding
        to={'Home'}
        title={'Your Spaces'}
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
          <TouchableHighlight
            onPress={() => props.navigation.navigate('CarportRegister')}
            style={styles.container}
            underlayColor={'#c2e8ff'}>
            <Text style={styles.text}>Add Listing</Text>
          </TouchableHighlight>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollcontainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: 340,
    height: 48,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    fontFamily: 'Montserrat-MediumItalic',
  },
});

export default CarportListView;
