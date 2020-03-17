import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {AuthContext} from '../../context/AuthContext';

const RegisterView = props => {
  const context = useContext(AuthContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [display_name, setname] = useState('');
  const [error, seterror] = useState('');

  const handleSubmit = () => {
    console.log('submit');
    console.log('fuck prettier');
  };

  const handleRedirect = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.bg}>
      {error ? <Text>{error}</Text> : null}
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
          value={password}
          onChangeText={text => setpassword(text)}
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
});

export default RegisterView;
