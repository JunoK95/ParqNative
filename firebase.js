import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import {config} from './config';

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} = config;

console.log('Firebase Config', config);

// const firebaseConfig = {
//   apiKey,
//   authDomain,
//   databaseURL,
//   projectId,
//   storageBucket,
//   messagingSenderId,
//   appId,
//   measurementId,
// };

let firebaseConfig;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // firebaseConfig = {
  //   apiKey: 'AIzaSyATcMKUsuSxIei9MXn6HKUp2GT5iiudrvk',
  //   authDomain: 'parq-alpha.firebaseapp.com',
  //   databaseURL: 'https://parq-alpha.firebaseio.com',
  //   projectId: 'parq-alpha',
  //   storageBucket: 'parq-alpha.appspot.com',
  //   messagingSenderId: '480005596961',
  //   appId: '1:480005596961:web:b776dacf873bfa50ba0060',
  //   measurementId: 'G-5EYFZNH2EV',
  // };
  firebaseConfig = {
    apiKey: 'AIzaSyCGAL8COJ7y7oWhg5sfI8MkWyL6EPcmg5U',
    authDomain: 'parq-dev.firebaseapp.com',
    databaseURL: 'https://parq-dev.firebaseio.com',
    projectId: 'parq-dev',
    storageBucket: 'parq-dev.appspot.com',
    messagingSenderId: '449904544159',
    appId: '1:449904544159:web:cef670d84ded46425e95aa',
    measurementId: 'G-YM2EM0HP8S',
  };
} else {
  // firebaseConfig = {
  //   apiKey: 'AIzaSyATcMKUsuSxIei9MXn6HKUp2GT5iiudrvk',
  //   authDomain: 'parq-alpha.firebaseapp.com',
  //   databaseURL: 'https://parq-alpha.firebaseio.com',
  //   projectId: 'parq-alpha',
  //   storageBucket: 'parq-alpha.appspot.com',
  //   messagingSenderId: '480005596961',
  //   appId: '1:480005596961:web:b776dacf873bfa50ba0060',
  //   measurementId: 'G-5EYFZNH2EV',
  // };
  firebaseConfig = {
    apiKey: 'AIzaSyCGAL8COJ7y7oWhg5sfI8MkWyL6EPcmg5U',
    authDomain: 'parq-dev.firebaseapp.com',
    databaseURL: 'https://parq-dev.firebaseio.com',
    projectId: 'parq-dev',
    storageBucket: 'parq-dev.appspot.com',
    messagingSenderId: '449904544159',
    appId: '1:449904544159:web:cef670d84ded46425e95aa',
    measurementId: 'G-YM2EM0HP8S',
  };
}

console.log('firebaseConfig => ', firebaseConfig);

firebase.initializeApp(firebaseConfig);

export default firebase;
