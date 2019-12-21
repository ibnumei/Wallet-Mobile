import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import TransactionContainer from './TransactionContainer';
import SInfo from 'react-native-sensitive-info';

jest.mock('axios');

describe('TransactionContainer', () => {
  describe('#render', function() {
    let wrapper;
    let firstTransaction;
    let secondTransaction;
    let transactions;
    let response;
    let user;

    beforeEach(async () => {
      user = {
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

      firstTransaction = {
        id: 1,
        walletId: 1,
        nominal: 1000,
        type: 'withdraw',
        description: 'ehe',
        createdAt: '2019-12-03T00:03:03.432Z',
        updatedAt: '2019-12-03T00:03:03.432Z',
        beneficiaryData: {
          id: 1,
          name: 'Mitshuki Temannya Boruto'
        }
      };

      secondTransaction = {
        id: 2,
        walletId: 1,
        nominal: 10000,
        type: 'deposit',
        description: 'testing euy',
        createdAt: '2019-12-01T00:10:18.917Z',
        updatedAt: '2019-12-01T00:10:18.917Z',
        beneficiaryData: {}
      };
      transactions = [firstTransaction, secondTransaction];
      response = {
        data: transactions
      };
      SInfo.getItem = jest.fn();

      SInfo.getItem.mockResolvedValue(JSON.stringify(user));
      axios.get.mockResolvedValue(response);
      wrapper = shallow(<TransactionContainer />);

      await flushPromises();
    });

    afterEach(function() {
      jest.clearAllMocks();
    });

    it('should render TransactionFilterDescription, TransactionFilterMenu, TransactionList', () => {
      const filterDescriptionElement = wrapper.find(
        'TransactionFilterDescription'
      );
      const menuElement = wrapper.find('TransactionFilterMenu');
      const listElement = wrapper.find('TransactionList');

      expect(filterDescriptionElement).toHaveLength(1);
      expect(menuElement).toHaveLength(1);
      expect(listElement).toHaveLength(1);
    });

    it('should show the filtered transactions by description "ehe" when transaction filter description is changed', async () => {
      const filterInput = 'ehe';

      wrapper
        .find('TransactionFilterDescription')
        .simulate('filter', filterInput);

      expect(wrapper.find('TransactionList').props().transactions).toEqual([
        firstTransaction
      ]);
    });

    it('should show the transactions with amount greater than or equal with 10000', () => {
      const selectedAmount = [10000, 20000];
      const selectedSort = 'newest-date';

      wrapper
        .find('TransactionFilterMenu')
        .simulate('select', selectedAmount, selectedSort);

      expect(wrapper.find('TransactionList').props().transactions).toEqual([
        secondTransaction
      ]);
    });

    it('should show the transactions with lowest-amount first', () => {
      const selectedAmount = [1000, 200000];
      const selectedSort = 'lowest-amount';

      wrapper
        .find('TransactionFilterMenu')
        .simulate('select', selectedAmount, selectedSort);

      expect(wrapper.find('TransactionList').props().transactions).toEqual([
        firstTransaction,
        secondTransaction
      ]);
    });

    it('should call getState with User', async () => {
      expect(SInfo.getItem).toHaveBeenCalledWith('User', {});
    });
  });
});
