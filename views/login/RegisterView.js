import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {AuthContext} from '../../context/AuthContext';
import {validateEmail, validatePassword} from '../../helpers/helper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const RegisterView = props => {
  const context = useContext(AuthContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [password2, setpassword2] = useState('');
  const [display_name, setname] = useState('');
  const [error, seterror] = useState('');

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      seterror('Invalid Email');
      return;
    }
    if (!validatePassword(password, password2)) {
      seterror('Invalid Password');
      return;
    }
    if (display_name.length <= 0) {
      seterror('Display Name Empty');
      return;
    }
    context.functions.registerUser(email, password, display_name).then(res => {
      if (res.error) {
        console.log(res);
        seterror(res.error.message);
      } else {
        seterror(null);
        props.navigation.navigate('Login');
      }
    });
  };

  const handleRedirect = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.bg}>
      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
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
        <Icon iconStyle={styles.icon} name={'face'} size={30} />
        <TextInput
          style={styles.textField}
          name={'display_name'}
          placeholder={'display name'}
          textContentType={'name'}
          value={display_name}
          onChangeText={text => setname(text)}
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
      <View style={styles.textFieldContainer}>
        <Icon iconStyle={styles.icon} name={'done'} size={30} />
        <TextInput
          style={styles.textField}
          name={'password2'}
          placeholder={'confirm password'}
          textContentType={'password'}
          secureTextEntry
          value={password2}
          onChangeText={text => setpassword2(text)}
        />
      </View>
      <Button
        containerStyle={styles.buttonContainer}
        title={'Sign Up'}
        onPress={handleSubmit}
      />
      <Button
        containerStyle={styles.buttonContainer}
        title={'Sign Up With Google'}
        onPress={handleRedirect}
      />
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
    margin: 8,
    marginHorizontal: 48,
    alignContent: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f44336',
    paddingHorizontal: 64,
    marginHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});

export default RegisterView;
