import React from 'react';
import diamond from '../../resources/images/39.png';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

const PaymentActivityIndicator = props => {
  const {loading, setopen} = props;
  return (
    <View style={styles.container}>
      {loading === 'success' ? (
        <React.Fragment>
          <Text style={styles.title}>SUCCESS!</Text>
          <Image style={styles.image} source={diamond} />
          <Text style={styles.subtitle}>
            It may take a few minutes for the balance to show up on your account
            as we process your order.
          </Text>
          <Text style={styles.subtitle}>Thank you for your purchase!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setopen(false)}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </React.Fragment>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 32,
    marginVertical: 32,
    minHeight: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#11af4a',
    fontWeight: 'bold',
  },
  image: {
    margin: 32,
    height: 128,
    width: 128,
  },
  button: {
    marginTop: 12,
    padding: 8,
  },
  buttonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default PaymentActivityIndicator;
