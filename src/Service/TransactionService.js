import axios from 'axios';
import constants from '../Constant';

const { BASE_URL } = constants;

const getTransactionByUserId = (id, limit, walletId) => {
  const transactionPath = `${BASE_URL}/users/${id}/wallets/${walletId}/transactions`;
  if (limit) {
    return axios.get(`${transactionPath}?limit=${limit}`);
  }
  return axios.get(transactionPath);
};

const topUpWallet = (id, nominal, walletId) => {
  const topUpPath = `${BASE_URL}/users/${id}/wallets/${walletId}/transactions`;
  return axios.post(topUpPath, {
    type: 'deposit',
    description: 'top up wallet balance',
    nominal
  });
};

const transfer = async (
  id,
  idWallet,
  payeeId,
  nominal,
  transferDescription
) => {
  const transferPath = `${BASE_URL}/users/${id}/wallets/${idWallet}/transactions`;
  return axios.post(transferPath, {
    type: 'withdraw',
    description: ' ' + transferDescription,
    nominal,
    beneficiaryId: payeeId
  });
};

const checkPayee = async cashtag => {
  const checkPayeePath = `${BASE_URL}/users?cashtag=${cashtag}`;
  const { data } = await axios.get(checkPayeePath);
  return data[0];
};

export default {
  topUpWallet,
  getTransactionByUserId,
  transfer,
  checkPayee
};
