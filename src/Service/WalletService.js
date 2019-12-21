import axios from 'axios';
import constants from '../Constant';

const { BASE_URL } = constants;

const getWalletByUserId = userId => {
  return axios.get(`${BASE_URL}/users/${userId}/wallets`);
};

export default {
  getWalletByUserId
};
