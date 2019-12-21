import axios from 'axios';
import constant from '../Constant';
import StorageService from './StorageService';
import jwtDecode from 'jwt-decode';

const { BASE_URL } = constant;
const { saveToken, saveUserData } = StorageService;

const login = async inputedData => {
  const {
    data: { token }
  } = await axios.post(`${BASE_URL}/login`, inputedData);
  await saveToken(token);
  const { user } = jwtDecode(token);
  await saveUserData(user);
};
export default {
  login
};
