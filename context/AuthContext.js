import React, {useState, useEffect, createContext} from 'react';
import firebase from '../firebase';
import {
  getUserData,
  initializeDefaultUser,
  getSavedLocations,
  addSaveLocation,
  getSavedVehicles,
  addVehicle,
  updateCarportData,
  createReservation,
  getUserReservationHistory,
  deleteVehicle,
  updateStripeId,
  setStripeAccountId,
  updateUserData,
} from '../firebase_func/firestoreFunctions';
import {getWallet} from '../firebase_func/walletFunctions';
import {GoogleSignin} from '@react-native-community/google-signin';
import Axios from 'axios';

export const AuthContext = createContext();

const auth = firebase.auth();

function AuthContextProvider(props) {
  const [fetching, setfetching] = useState(true);
  const [state, setstate] = useState({
    user_id: null,
    user_data: null,
    logged_in: false,
    site_access: false,
    saved_locations: [],
    saved_vehicles: [],
    payment_methods: [],
    nearby_ports: [],
  });

  async function onAuthChange(user, credentials) {
    console.log('onAuthChange', user);
    if (user) {
      //Sign In
      let savedLocs = await getSavedLocations(user.uid).then(locations => {
        return locations;
      });
      let savedVehicles = await getSavedVehicles(user.uid).then(vehicles => {
        return vehicles;
      });

      var success = await getUserData(user.uid).then(data => {
        console.log('getting UserData', data);
        if (data.error) {
          //New User
          console.log('Current User', auth.currentUser);
        } else {
          if (data.stripe_customer_id) {
            getStripePaymentMethods(data.stripe_customer_id).then(res => {
              setstate({
                ...state,
                user_id: user.uid,
                logged_in: true,
                user_data: data,
                saved_locations: savedLocs,
                saved_vehicles: savedVehicles,
                payment_methods: res,
                nearby_ports: [],
              });
              setfetching(false);
            });
          } else {
            setstate({
              ...state,
              user_id: user.uid,
              logged_in: true,
              user_data: data,
              saved_locations: savedLocs,
              saved_vehicles: savedVehicles,
              nearby_ports: [],
            });
            setfetching(false);
            assignStripeId();
          }
          return true;
        }
      });
    } else {
      //Sign Out
      console.log('logged out');
      setstate({
        user_id: null,
        logged_in: false,
        user_data: null,
        saved_locations: null,
        saved_vehicles: null,
        payment_methods: null,
        site_access: false,
        nearby_ports: null,
      });
      setfetching(false);
      return true;
    }
    return success;
  }

  useEffect(() => {
    setfetching(true);
    console.log('incontext');
    const unsubscribe = auth.onAuthStateChanged(onAuthChange);
    return () => {
      unsubscribe();
    };
  }, []);

  const enterSite = () => {
    setstate({
      ...state,
      site_access: true,
    });
  };

  const registerUser = async (email, pass, display_name) => {
    var result = false;
    result = await auth
      .createUserWithEmailAndPassword(email, pass)
      .then(async res => {
        console.log('created user with email pass', res);
        const userData = await initializeDefaultUser(
          auth.currentUser.uid,
          auth.currentUser,
          display_name,
        );
        let savedLocs = await getSavedLocations(auth.currentUser.uid).then(
          locations => {
            return locations;
          },
        );
        let savedVehicles = await getSavedVehicles(auth.currentUser.uid).then(
          vehicles => {
            return vehicles;
          },
        );
        setstate({
          ...state,
          user_id: auth.currentUser.uid,
          logged_in: true,
          user_data: userData,
          saved_locations: savedLocs,
          saved_vehicles: savedVehicles,
          payment_methods: [],
          nearby_ports: [],
        });
        setfetching(false);
        return res;
      })
      .catch(function(error) {
        // Handle Errors here.
        return {
          error: {
            code: error.code,
            message: error.message,
          },
        };
      });

    return result;
  };

  const getCurrentUser = () => {
    return auth.currentUser;
  };

  const isVerified = () => {
    // console.log(auth)
    if (auth.currentUser) {
      return auth.currentUser.emailVerified;
    }
    return false;
  };

  const sendVerificationEmail = async () => {
    var sent = await auth.currentUser
      .sendEmailVerification()
      .then(res => {
        console.log('Verification Email sent', res);
        return true;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
    return sent;
  };

  const signInUser = async (email, pass) => {
    var result = await auth
      .signInWithEmailAndPassword(email, pass)
      .then(res => {
        setstate({
          ...state,
          user_id: res.user.uid,
          logged_in: true,
        });
        console.log('Login Successful', res);
        console.log('state is', state);
        return res;
      })
      .catch(function(error) {
        // Handle Errors here.
        return {
          error: {
            code: error.code,
            message: error.message,
          },
        };
      });
    return result;
  };

  const googleSignIn = async (id_token, access_token) => {
    const credential = await firebase.auth.GoogleAuthProvider.credential(
      id_token,
      access_token,
    );
    console.log('CREDENTIAL => ', credential);
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential)
      .then(res => {
        console.log('Google Signed In => ', res);
        Axios({
          method: 'POST',
          data: {
            message: res,
            description: 'Google Sign In Success',
          },
          url: 'https://us-central1-parq-dev.cloudfunctions.net/sendLog',
        });
        getUserData(auth.currentUser.uid).then(async data => {
          if (data.error) {
            const userData = await initializeDefaultUser(
              auth.currentUser.uid,
              res.additionalUserInfo.profile,
              res.additionalUserInfo.profile.name,
            );
            let savedLocs = await getSavedLocations(auth.currentUser.uid).then(
              locations => {
                return locations;
              },
            );
            let savedVehicles = await getSavedVehicles(
              auth.currentUser.uid,
              vehicles => {
                return vehicles;
              },
            );
            setstate({
              ...state,
              user_id: auth.currentUser.uid,
              logged_in: true,
              user_data: userData,
              saved_locations: savedLocs,
              saved_vehicles: savedVehicles,
              payment_methods: [],
              nearby_ports: [],
            });
            setfetching(false);
            return true;
          }
        });
        return res;
      })
      .catch(err => {
        console.log('Error using GoogleSignIn => ', err);
        Axios({
          method: 'POST',
          data: {
            type: 'error',
            message: err,
            description: 'Error using Google SignIn',
          },
          url: 'https://us-central1-parq-dev.cloudfunctions.net/sendLog',
        });
      });
    console.log('firebaseUserCredential', firebaseUserCredential);
    if (firebaseUserCredential) {
      return true;
    }
    return false;
  };

  const signInSuccess = authResult => {
    console.log('authResult', authResult);
    setstate({
      ...state,
      user_id: authResult.user.uid,
      logged_in: true,
    });
  };

  const signOutUser = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (err) {
      console.log(err);
    }
    var result = await auth
      .signOut()
      .then(() => {
        setstate({
          user_id: null,
          logged_in: false,
          user_data: null,
        });
        console.log('sign out successful');
        console.log(state);
        return {success: true};
      })
      .catch(function(error) {
        return {
          error: {
            code: error.code,
            message: error.message,
          },
        };
      });
    return result;
  };

  const setNearbyHomePorts = async ports => {
    setstate({
      ...state,
      nearby_ports: ports,
    });
  };

  const addContextSaveLocation = async (
    title,
    formatted_address,
    place_id,
    lat,
    lng,
  ) => {
    addSaveLocation(
      state.user_id,
      title,
      formatted_address,
      place_id,
      lat,
      lng,
    ).then(locations => {
      const joinedLocations = state.saved_locations.concat({
        id: locations.id,
        data: locations.data,
      });
      console.log(joinedLocations);
      setstate({
        ...state,
        saved_locations: joinedLocations,
      });
    });
  };

  const assignStripeId = async () => {
    const {email, display_name, stripe_customer_id} = state.user_data;
    if (!stripe_customer_id) {
      await Axios({
        method: 'post',
        url:
          'https://us-central1-parq-dev.cloudfunctions.net/stripeCreateNewCustomer',
        data: {
          email,
          name: display_name,
          user_id: state.user_id,
        },
      }).then(res => {
        console.log('stripe customer', res);
        if (res.status === 200) {
          updateStripeId(state.user_id, res.data.id);
          setstate({
            ...state,
            user_data: {
              ...state.user_data,
              stripe_customer_id: res.data.id,
            },
          });
        }
      });
    }
    return;
  };

  const assignStripeAccount = async () => {
    const {email, stripe_account_id} = state.user_data;
    let stripeAccount;
    if (!stripe_account_id) {
      stripeAccount = await Axios({
        method: 'POST',
        url:
          'https://us-central1-parq-dev.cloudfunctions.net/stripeCreateAccount',
        data: {
          email,
          user_id: state.user_id,
          metadata: {
            user_id: state.user_id,
            description: 'Assigning Stripe Account',
          },
        },
      }).then(res => {
        console.log('stripe account', res);
        if (res.status === 200) {
          setStripeAccountId(state.user_id, res.data.id);
          setstate({
            ...state,
            user_data: {
              ...state.user_data,
              stripe_account_id: res.data.id,
            },
          });
          return res.data;
        }
      });
    }
    return stripeAccount;
  };

  const getStripePaymentMethods = async stripe_customer_id => {
    let stripeCards = [];
    stripeCards = await Axios({
      method: 'post',
      url: 'https://us-central1-parq-dev.cloudfunctions.net/stripeListCards',
      data: {
        customer_id: stripe_customer_id,
      },
    })
      .then(res => {
        console.log(res.data.data);
        return res.data.data;
      })
      .catch(err => {
        console.log('Error Getting Stripe Payment Methods => ', err);
      });
    return stripeCards;
  };

  const getContextWallet = async () => {
    const wallet = await getWallet(state.user_id);
    return wallet;
  };

  const getAllPaymentMethods = async () => {
    const stripeMethods = await getStripePaymentMethods(
      state.user_data.stripe_customer_id,
    );
    const parqWallet = await getContextWallet();
    const methods = {
      wallet: parqWallet,
      cards: stripeMethods,
    };

    return methods;
  };

  const addContextVehicle = async updates => {
    addVehicle(state.user_id, updates).then(vehicles => {
      const joinedVehicles = state.saved_vehicles.concat({
        id: vehicles.id,
        data: vehicles.data,
      });
      console.log(joinedVehicles);
      setstate({
        ...state,
        saved_vehicles: joinedVehicles,
      });
    });
  };

  const deleteContextVehicle = async vehicle_id => {
    const success = await deleteVehicle(vehicle_id).then(res => {
      if (res) {
        const removedVehicle = state.saved_vehicles.filter(vehicle => {
          return vehicle.id !== vehicle_id;
        });
        console.log(removedVehicle);
        setstate({
          ...state,
          saved_vehicles: removedVehicle,
        });
        return res;
      } else {
        console.error('res not true', res);
      }
    });

    return success;
  };

  const editContextCarport = async (carport_id, changedData) => {
    let complete = false;
    complete = await updateCarportData(carport_id, changedData).then(res => {
      console.log('editContextCarport', res);
      return true;
    });

    return complete;
  };

  const reserveCarport = async (
    carport_id,
    carport_data,
    start,
    end,
    vehicle_id,
    vehicle_data,
    price,
    hours,
  ) => {
    var result = await createReservation(
      state.user_id,
      state.user_data,
      start,
      end,
      vehicle_id,
      vehicle_data,
      carport_id,
      carport_data,
      price,
      hours,
    )
      .then(res => {
        return res;
      })
      .catch(err => console.error(err));

    return result;
  };

  const reservationHistory = async () => {
    const history = await getUserReservationHistory(state.user_id).then(res => {
      return res;
    });
    return history;
  };

  const addContextPhone = async phone => {
    const result = await updateUserData(state.user_id, {phone});
    console.log('Phone Number Added ', result);
    setstate({
      ...state,
      user_data: {
        ...state.user_data,
        phone,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        fetching,
        functions: {
          getCurrentUser: getCurrentUser,
          registerUser: registerUser,
          signOutUser: signOutUser,
          signInUser: signInUser,
          googleSignIn: googleSignIn,
          signInSuccess: signInSuccess,
          addContextSaveLocation: addContextSaveLocation,
          addContextVehicle: addContextVehicle,
          addContextPhone: addContextPhone,
          deleteContextVehicle: deleteContextVehicle,
          editContextCarport: editContextCarport,
          enterSite: enterSite,
          isVerified: isVerified,
          sendVerificationEmail: sendVerificationEmail,
          reserveCarport: reserveCarport,
          reservationHistory: reservationHistory,
          assignStripeId: assignStripeId,
          assignStripeAccount: assignStripeAccount,
          getStripePaymentMethods: getStripePaymentMethods,
          getContextWallet: getContextWallet,
          getAllPaymentMethods: getAllPaymentMethods,
          setNearbyHomePorts: setNearbyHomePorts,
        },
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
