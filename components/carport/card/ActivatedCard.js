import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {splitStrByComma, convertToDollar} from '../../../helpers/helper';
import storeLogo from '../../../resources/images/112.png';
import FeaturesList from '../FeaturesList';
import {deactivateCarport} from '../../../firebase_func/firestoreFunctions';

const ActivatedCard = props => {
  const {port, port_id, refreshData} = props;

  const handleClick = () => {
    props.navigation.navigate('CarportEdit', {port, port_id});
  };

  const handleDeactivate = async () => {
    if (port_id) {
      const success = await deactivateCarport(port_id);
      console.log(port_id, ' deactivated ', success);
      if (success) {
        refreshData();
      }
    }
  };

  if (!port) {
    return null;
  }

  let scheduleTxt;
  if (port.schedule.allday) {
    scheduleTxt = '24hr';
  } else {
    scheduleTxt = `${port.schedule.start}-${port.schedule.end}`;
  }

  const splitAddress = splitStrByComma(port.location.address);

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={styles.cardheader}>
        <View style={styles.left}>
          <View style={styles.box}>
            <Text style={styles.price}>
              {'$' + convertToDollar(port.price_hr) + '/hr'}
            </Text>
            <Text numberOfLines={1} style={styles.address}>
              {splitAddress[0]}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.box}>
            <Text style={styles.distance}>{scheduleTxt}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentcontainer}>
        <View style={styles.leftcontent}>
          <View style={styles.avatarcontainer}>
            <Image style={styles.avatar} source={storeLogo} />
          </View>
        </View>
        <View style={styles.centercontent} />
        <View style={styles.rightcontent}>
          <FeaturesList features={port.accomodations} type={port.type} />
        </View>
      </View>
      <View style={styles.buttonrow}>
        <TouchableHighlight
          style={styles.button}
          underlayColor={'#ffc630'}
          onPress={() => handleDeactivate()}>
          <Text style={styles.buttonText}>Deactivate</Text>
        </TouchableHighlight>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 64,
    height: 200,
    backgroundColor: '#fff',
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
  cardheader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    marginTop: 12,
  },
  contentcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  doublecontainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  box: {
    flexDirection: 'column',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftcontent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  avatarcontainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centercontent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightcontent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  address: {
    fontSize: 16,
    color: '#888',
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  distance: {
    fontSize: 16,
    color: '#888',
    textAlign: 'right',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  restriction: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  restrictitem: {
    backgroundColor: '#fa8072',
    color: 'white',
    marginHorizontal: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    marginLeft: 12,
  },
  avatardisabled: {
    width: 48,
    height: 48,
    marginLeft: 12,
    opacity: 0.3,
  },
  buttonrow: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  button: {
    width: 220,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderColor: '#11a4ff',
    borderRadius: 20,
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#11a4ff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});

export default withNavigation(ActivatedCard);
