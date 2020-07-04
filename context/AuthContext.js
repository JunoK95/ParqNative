import React, {useState, useEffect, createContext} from 'react';
import firebase from '../firebase';
import {
  getUserData,
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
import {
  stripeAssignCustomerId,
  stripeAssignConnectAccountId,
  stripeListCustomerCards,
} from '../api/stripe_index';
import {registerUserEmail, signInUserEmail} from './authentication/email';
import {getUserStateInfo} from './authentication/shared-functions';
import {googleFirebaseSignin} from './authentication/google-signin';

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
      let savedLocs = await getSavedLocations(user.uid);
      let savedVehicles = await getSavedVehicles(user.uid);
      let userData = await getUserData(user.uid);

      if (userData.error) {
        //New User
        console.log('Current User', auth.currentUser);
      } else {
        setstate({
          ...state,
          user_id: user.uid,
          logged_in: true,
          user_data: userData,
          saved_locations: savedLocs,
          saved_vehicles: savedVehicles,
          nearby_ports: [],
        });
        setfetching(false);
        assignStripeCustomerId();
        return true;
      }
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
    return true;
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

  const getCurrentUser = () => {
    return auth.currentUser;
  };

  const getCurrentUserIdToken = async () => {
    const IdToken = await firebase.auth().currentUser.getIdToken();
    return IdToken;
  };

  const isVerified = () => {
    // console.log(auth)
    if (auth.currentUser) {
      return auth.currentUser.emailVerified;
    }
    return false;
  };

  const sendVerificationEmail = async () => {
    try {
      await auth.currentUser.sendEmailVerification();
      console.log('Verification Email sent');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const registerUser = async (email, pass, display_name) => {
    try {
      await registerUserEmail();
    } catch (error) {
      console.error('ERROR LOGGIN IN WITH EMAIL => ', error);
      return {
        error: {
          code: error.code,
          message: error.message,
        },
      };
    }

    const userInfo = await getUserStateInfo(email, display_name);
    setstate({
      ...state,
      user_id: auth.currentUser.uid,
      logged_in: true,
      user_data: userInfo.userData,
      saved_locations: userInfo.savedLocations,
      saved_vehicles: userInfo.savedVehicles,
      payment_methods: [],
      nearby_ports: [],
    });
    setfetching(false);
    return true;
  };

  const signInUser = async (email, pw) => {
    const result = await signInUserEmail(email, pw);
    if (result.error) {
      console.error('ERROR SIGNING IN');
      return {
        error: {
          code: result.error.code,
          message: result.error.message,
        },
      };
    } else {
      setstate({
        ...state,
        user_id: result.user.uid,
        logged_in: true,
      });
      console.log('Login Successful', result);
      return true;
    }
  };

  const googleSignIn = async (id_token, access_token) => {
    let firebaseUserCredential;
    try {
      firebaseUserCredential = await googleFirebaseSignin(
        id_token,
        access_token,
      );
      console.log('FIREBASE USER CREDENTIAL => ', firebaseUserCredential);
    } catch (error) {
      console.error('Google Sign In Failed');
      return;
    }
    const {email, name} = firebaseUserCredential.additionalUserInfo.profile;
    const userInfo = await getUserStateInfo(email, name);

    setstate({
      ...state,
      user_id: auth.currentUser.uid,
      logged_in: true,
      user_data: userInfo.userData,
      saved_locations: userInfo.savedLocations,
      saved_vehicles: userInfo.savedVehicles,
      payment_methods: [],
      nearby_ports: [],
    });
    setfetching(false);

    if (firebaseUserCredential) {
      return true;
    }
    return false;
  };

  const signOutUser = async () => {
    let success = false;
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      success = true;
    } catch (err) {
      console.log(err);
    }

    try {
      await auth.signOut();
      success = true;
    } catch (error) {
      console.log(error);
    }

    if (success) {
      setstate({
        user_id: null,
        logged_in: false,
        user_data: null,
      });
      console.log('sign out successful');
      return;
    } else {
      return false;
    }
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

  const assignStripeCustomerId = async () => {
    const {email, display_name, stripe_customer_id} = state.user_data;
    if (!stripe_customer_id) {
      const data = {
        email,
        name: display_name,
        user_id: state.user_id,
      };
      try {
        const response = await stripeAssignCustomerId(data);
        if (response.error) {
          //handle Error
          console.error('ERROR CREATING CUSTOMER ID');
        } else {
          console.log('STRIPE CUSTOMER ID CREATED => ', response);
          updateStripeId(state.user_id, response.data.id);
          setstate({
            ...state,
            user_data: {
              ...state.user_data,
              stripe_customer_id: response.data.id,
            },
          });
        }
      } catch (error) {
        console.error('ERROR CREATING CUSTOMER ID');
      }
    }
    return;
  };

  const assignStripeAccount = async () => {
    const {email, stripe_account_id} = state.user_data;
    let stripeAccount;
    if (!stripe_account_id) {
      const data = {
        email,
        user_id: state.user_id,
        metadata: {
          user_id: state.user_id,
          description: 'Assigning Stripe Account',
        },
      };
      stripeAccount = await stripeAssignConnectAccountId(data);
      if (stripeAccount.error) {
        console.error(
          'ERROR CREATING STRIPE CONNECT ACCOUNT ID => ',
          stripeAccount.error,
        );
      } else {
        setStripeAccountId(state.user_id, stripeAccount.data.id);
        setstate({
          ...state,
          user_data: {
            ...state.user_data,
            stripe_account_id: stripeAccount.data.id,
          },
        });
        return stripeAccount.data;
      }
    }
    return stripeAccount;
  };

  const getStripePaymentMethods = async stripe_customer_id => {
    let stripeCards = [];

    const response = await stripeListCustomerCards(stripe_customer_id);
    if (response.error) {
      console.error('ERROR GETTING STRIPE PAYMENT METHODS => ', response.error);
    } else {
      console.log('STRIPE LIST CUSTOMER CARD', response);
      stripeCards = response.data.data;
    }

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
      carport_id,
      carport_data,
      start,
      end,
      vehicle_id,
      vehicle_data,
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
    const history = await getUserReservationHistory(state.user_id);
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
          getCurrentUser,
          getCurrentUserIdToken,
          registerUser,
          signOutUser,
          signInUser,
          googleSignIn,
          addContextSaveLocation,
          addContextVehicle,
          addContextPhone,
          deleteContextVehicle,
          editContextCarport,
          enterSite,
          isVerified,
          sendVerificationEmail,
          reserveCarport,
          reservationHistory,
          assignStripeCustomerId,
          assignStripeAccount,
          getStripePaymentMethods,
          getContextWallet,
          getAllPaymentMethods,
          setNearbyHomePorts,
        },
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
