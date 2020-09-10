import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {AuthContext} from '../../context/AuthContext';
import {validateEmail, validatePassword} from '../../helpers/helper';
import RoundedButton from '../../components/button/RoundedButton';
import {GoogleSignInButton, AppleSignInButton} from '../../components/login';
import OrbLoading from '../../components/loading/OrbLoading';

const RegisterView = props => {
  const context = useContext(AuthContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [password2, setpassword2] = useState('');
  const [display_name, setname] = useState('');
  const [load, setload] = useState(false);
  const [error, seterror] = useState('');

  const handleSubmit = () => {
    setload(true);
    if (!validateEmail(email)) {
      seterror('Invalid Email');
      setload(false);
      return;
    }
    if (!validatePassword(password, password2)) {
      seterror('Invalid Password');
      setload(false);
      return;
    }
    if (display_name.length <= 0) {
      seterror('Display Name Empty');
      setload(false);
      return;
    }
    context.functions.registerUser(email, password, display_name).then(res => {
      if (res.error) {
        console.log(res);
        seterror(res.error.message);
        setload(false);
      } else {
        seterror(null);
        setload(false);
        props.navigation.navigate('Login', {
          message: 'Successfully Created Account',
        });
      }
    });
  };

  if (load) {
    return <OrbLoading bgcolor={'#11a4ff'} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={styles.bg}>
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <View style={styles.textFieldContainer}>
          <Icon iconStyle={styles.icon} name={'email'} size={30} />
          <TextInput
            style={styles.textField}
            placeholderTextColor={'#AAA'}
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
            placeholderTextColor={'#AAA'}
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
            placeholderTextColor={'#AAA'}
            name={'password'}
            placeholder={'password'}
            textContentType={'newPassword'}
            autoCorrect={false}
            value={password}
            secureTextEntry
            onChangeText={text => setpassword(text)}
          />
        </View>
        <View style={styles.textFieldContainer}>
          <Icon iconStyle={styles.icon} name={'done'} size={30} />
          <TextInput
            style={styles.textField}
            placeholderTextColor={'#AAA'}
            name={'password2'}
            placeholder={'confirm password'}
            textContentType={'newPassword'}
            autoCorrect={false}
            secureTextEntry
            value={password2}
            onChangeText={text => setpassword2(text)}
          />
        </View>
        <View style={styles.buttonGroup}>
          <RoundedButton
            title={'Submit'}
            onPress={handleSubmit}
            width={Dimensions.get('window').width - 96}
            backgroundColor={'#ffc630'}
          />
        </View>
        <View style={styles.centeredGroup}>
          <Text style={styles.orText}>- OR -</Text>
        </View>
        <View style={styles.buttonGroup}>
          <GoogleSignInButton seterror={seterror} setload={setload} />
          {Platform.OS === 'ios' ? (
            <AppleSignInButton seterror={seterror} setload={setload} />
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Landing');
          }}>
          <View style={styles.backContainer}>
            <Text style={styles.backText}>Go Back</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
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
    color: '#333',
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
  orText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
  buttonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
  },
  centeredGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: 'blue',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterView;
