import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {AuthContext} from '../../context/AuthContext';

const LoginView = props => {
  const context = useContext(AuthContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [load, setload] = useState(false);

  const handleSignIn = async () => {
    setload(true);
    if (email === '') {
      seterror('Email Address Missing');
    } else if (password === '') {
      seterror('Password Missing');
    } else {
      console.log('signing in');
      await context.functions.signInUser(email, password).then(res => {
        if (res.error) {
          seterror(res.error.message);
        } else {
          setload(false);
          props.navigation.navigate('App');
        }
      });
    }
  };

  const handleFbSignIn = () => {
    console.log('fblogin');
  };

  return (
    <View style={styles.bg}>
      {error ? <Text>{error}</Text> : null}
      {load ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
          <View style={styles.textFieldContainer}>
            <Icon iconStyle={styles.icon} name={'email'} size={30} />
            <TextInput
              style={styles.textField}
              name={'email'}
              placeholder={'email'}
              textContentType={'emailAddress'}
              value={email}
              onChangeText={text => setemail(text)}
            />
          </View>
          <View style={styles.textFieldContainer}>
            <Icon iconStyle={styles.icon} name={'lock'} size={30} />
            <TextInput
              style={styles.textField}
              name={'password'}
              placeholder={'password'}
              textContentType={'password'}
              secureTextEntry
              value={password}
              onChangeText={text => setpassword(text)}
            />
          </View>
          <Button
            containerStyle={styles.buttonContainer}
            title={'Sign In'}
            onPress={handleSignIn}
          />
          <Button
            containerStyle={styles.buttonContainer}
            title={'Login With Facebook'}
            onPress={() => handleFbSignIn()}
          />
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#11a4ff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingVertical: 8,
    paddingRight: 12,
    color: '#ffc630',
  },
  textFieldContainer: {
    margin: 12,
    marginHorizontal: 64,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textField: {
    height: 48,
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  buttonContainer: {
    margin: 12,
    marginHorizontal: 48,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default LoginView;
