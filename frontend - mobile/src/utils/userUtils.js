import AsyncStorage from '@react-native-community/async-storage';
import {storageKeys} from '../res/global';

async function getLoggedUser() {
  let user = await AsyncStorage.getItem(storageKeys.LOGGEDUSER);
  if (user) {
    user = JSON.parse(user);
    return user;
  } else {
    return {email: ''};
  }
}

async function logout() {
  let user = await AsyncStorage.getItem(storageKeys.LOGGEDUSER);
  user = JSON.parse(user);
  const removeToken = {
    ...user,
    token: undefined,
  };
  await AsyncStorage.setItem(
    storageKeys.LOGGEDUSER,
    JSON.stringify(removeToken),
  );
}

export {getLoggedUser, logout};
