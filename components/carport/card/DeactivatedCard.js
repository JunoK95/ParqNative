import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import {splitStrByComma, convertToDollar} from '../../../helpers/helper';
import storeLogo from '../../../resources/images/112.png';
import FeaturesList from '../FeaturesList';
import {withNavigation} from 'react-navigation';
import {Input} from 'react-native-elements';

const DeactivatedCard = props => {
  const {port} = props;
  const [active, setactive] = useState(false);

  const handleClick = () => {
    props.navigation.navigate('CarportEdit', {port});
  };

  const handleActivate = () => {
    console.log('activate');
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
  if (!active) {
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
              <Image style={styles.avatardisabled} source={storeLogo} />
            </View>
          </View>
          <View style={styles.centercontent} />
          <View style={styles.rightcontent}>
            <FeaturesList
              features={port.accomodations}
              type={port.type}
              disabled
            />
          </View>
        </View>
        <View style={styles.buttonrow}>
          <TouchableHighlight
            style={styles.buttondisabled}
            underlayColor={'#ffc630'}
            onPress={() => setactive(true)}>
            <Text style={styles.buttonTextdisabled}>Activate</Text>
          </TouchableHighlight>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={handleClick}>
        <View style={styles.doublecontentcontainer}>
          <View style={styles.item}>
            <Text style={styles.itemtext}>
              {'$' + convertToDollar(port.price_hr)}
            </Text>
            <TouchableHighlight
              style={styles.itembutton}
              underlayColor={'#ffc630'}
              onPress={() => setactive(false)}>
              <Text style={styles.itembuttontext}>Set Price</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemtext}>
              {port.schedule.allday ? '24h' : 'other'}
            </Text>
            <TouchableHighlight
              style={styles.itembutton}
              underlayColor={'#ffc630'}
              onPress={() => setactive(false)}>
              <Text style={styles.itembuttontext}>Set Time</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.buttonrow}>
          <View style={styles.row}>
            <TouchableHighlight
              style={styles.buttonhalf2}
              underlayColor={'#ffc630'}
              onPress={() => setactive(false)}>
              <Text style={styles.buttonTextdisabled2}>Back</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonhalf}
              underlayColor={'#ffc630'}
              onPress={() => setactive(false)}>
              <Text style={styles.buttonTextdisabled}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: 340,
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
  doublecontentcontainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  contentcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemtext: {
    fontSize: 24,
    fontFamily: 'Montserrat',
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
  avatar: {
    width: 48,
    height: 48,
    marginLeft: 12,
  },
  avatar2: {
    width: 64,
    height: 64,
  },
  avatardisabled: {
    width: 48,
    height: 48,
    marginLeft: 12,
    opacity: 0.3,
  },
  restriction: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  restrictitem: {
    backgroundColor: '#fa8072',
    color: 'white',
    marginHorizontal: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  buttonrow: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  buttondisabled: {
    width: 220,
    paddingVertical: 8,
    backgroundColor: '#11a4ff',
    borderRadius: 20,
  },
  buttonTextdisabled: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  buttonTextdisabled2: {
    textAlign: 'center',
    fontSize: 16,
    color: '#11a4ff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  itembutton: {
    width: 100,
    paddingVertical: 4,
    marginHorizontal: 6,
    marginVertical: 3,
    backgroundColor: '#fff',
    borderColor: '#11a4ff',
    borderRadius: 20,
    borderWidth: 2,
  },
  itembuttontext: {
    textAlign: 'center',
    fontSize: 14,
    color: '#11a4ff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  buttonhalf: {
    width: 100,
    paddingVertical: 8,
    marginHorizontal: 6,
    backgroundColor: '#11a4ff',
    borderRadius: 20,
  },
  buttonhalf2: {
    width: 100,
    paddingVertical: 8,
    marginHorizontal: 6,
    backgroundColor: '#fff',
    borderColor: '#11a4ff',
    borderRadius: 20,
    borderWidth: 2,
  },
});

export default withNavigation(DeactivatedCard);
