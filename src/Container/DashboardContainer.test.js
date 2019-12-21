import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import DashboardContainer from './DashboardContainer';
import { when } from 'jest-when';
import SInfo from 'react-native-sensitive-info';

jest.mock('axios');
jest.mock('react-native-sensitive-info');

describe('DashboardContainer', () => {
  let transaction;
  let wallet;
  const BASE_URL = 'http://localhost:3000';

  describe('#render', () => {
    const user = {
      id: 1,
      name: 'Adit A A',
      cashtag: '$adit',
      address: 'Jakarta',
      phoneNumber: '09871221090',
      email: 'adit@gmail.com',
      profileImage: 'profil image',
      createdAt: '2019-12-12T16:21:19.936Z',
      updatedAt: '2019-12-12T16:21:19.936Z'
    };

    wallet = {
      id: 1,
      userId: 1,
      balance: 50000,
      createdAt: '2019-12-12T16:25:45.774Z',
      updatedAt: '2019-12-12T16:25:45.774Z'
    };

    transaction = [
      {
        id: 1,
        walletId: 1,
        nominal: 1000,
        type: 'withdraw',
        description: 'test',
        createdAt: '2019-12-01T00:03:03.432Z',
        updatedAt: '2019-12-01T00:03:03.432Z',
        beneficiaryData: {
          id: 1,
          name: 'Mitshuki Temannya Boruto'
        }
      }
    ];

    let wrapper;

    beforeEach(async () => {
      const responseWallets = { data: wallet };
      const responseTransactions = { data: transaction };
      when(axios.get)
        .calledWith(`${BASE_URL}/users/${user.id}/wallets`)
        .mockResolvedValue(responseWallets)
        .calledWith(
          `${BASE_URL}/users/${user.id}/wallets/${
            wallet.id
          }/transactions?limit=5`
        )
        .mockResolvedValue(responseTransactions);

      SInfo.setItem = jest.fn();
      SInfo.getItem = jest.fn();

      SInfo.getItem.mockResolvedValue(JSON.stringify(wallet));
      wrapper = shallow(<DashboardContainer />);
      await flushPromises();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render UserInfo, WalletInfo, and TransactionsList', () => {
      expect(wrapper.find('UserInfo').length).toBe(1);
      expect(wrapper.find('WalletInfo').length).toBe(1);
      expect(wrapper.find('TransactionItem').length).toBe(1);
    });

    it('should return data wallet from server', async () => {
      expect(wrapper.find('WalletInfo').props().wallet).toEqual(wallet);
    });

    it('should return data recent transactions from server', async () => {
      expect(wrapper.find('TransactionItem').props().item).toEqual(
        transaction[0]
      );
    });

    it('should ', () => {});
  });
});
