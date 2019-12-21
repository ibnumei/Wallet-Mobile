import SInfo from 'react-native-sensitive-info';

const saveToken = async token => {
  await SInfo.setItem('Token', token, {});
};

const saveUserData = async data => {
  await SInfo.setItem('User', JSON.stringify(data), {});
};

const getToken = () => {
  return SInfo.getItem('Token', {});
};

export default {
  saveToken,
  saveUserData,
  getToken
};
