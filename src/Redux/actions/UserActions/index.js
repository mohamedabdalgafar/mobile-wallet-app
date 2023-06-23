import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CHANGE_INTERNET_CONNECTION,
  CHANGE_ALERT_MODAL,
  CHANGE_LOADER_MODAL,
  UPDATE_USER_DATA,
  LOGOUT,
  UPDATE_PREV_SCREEN,
} from '../../actionTypes';

export const changeIternetConnection = payload => {
  return {type: CHANGE_INTERNET_CONNECTION, payload};
};

export const chnageAlertModal = payload => {
  return {type: CHANGE_ALERT_MODAL, payload};
};

export const chnageLoadertModal = payload => {
  return {type: CHANGE_LOADER_MODAL, payload};
};

export const updateUserData = async payload => {
  await AsyncStorage.setItem('storedUserData', JSON.stringify(payload));

  return {type: UPDATE_USER_DATA, payload};
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('storedUserData');

  return {type: LOGOUT};
};

export const updatePrevScreen = payload => {
  return {type: UPDATE_PREV_SCREEN, payload};
};
