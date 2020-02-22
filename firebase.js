import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import Config from 'react-native-config';

const firebaseConfig = {
  apiKey: 'AIzaSyCGAL8COJ7y7oWhg5sfI8MkWyL6EPcmg5U',
  authDomain: 'parq-dev.firebaseapp.com',
  databaseURL: 'https://parq-dev.firebaseio.com',
  projectId: 'parq-dev',
  storageBucket: 'parq-dev.appspot.com',
  messagingSenderId: '449904544159',
  appId: '1:449904544159:web:cef670d84ded46425e95aa',
  measurementId: 'G-YM2EM0HP8S',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
