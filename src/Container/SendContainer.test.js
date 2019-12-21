import SendContainer from './SendContainer';
import React from 'react';
import { shallow } from 'enzyme';
import SInfo from 'react-native-sensitive-info';
import TransactionService from '../Service/TransactionService';
import WalletService from '../Service/WalletService';
import Notification from '../Component/Notification';
import constant from '../Constant';

const { ERROR_NOTIFICATION_COLOR, SUCCESS_NOTIFICATION_COLOR } = constant;
const { MIN_TRANSACTION_AMOUNT, MAX_TRANSACTION_AMOUNT } = constant;
const { toastNotification } = Notification;
const { topUpWallet, transfer, checkPayee } = TransactionService;
const { getWalletByUserId } = WalletService;

jest.mock('react-native-sensitive-info', () => ({
  setItem: jest.fn(),
  getItem: jest.fn()
}));
jest.mock('../Component/Notification', () => ({
  toastNotification: jest.fn()
}));
jest.mock('../Service/TransactionService', () => ({
  topUpWallet: jest.fn(),
  transfer: jest.fn(),
  checkPayee: jest.fn()
}));
jest.mock('../Service/WalletService', () => ({
  getWalletByUserId: jest.fn()
}));

describe('SendContainer', () => {
  describe('#render', () => {
    let wrapper;
    let user;
    let wallet;
    let transferOptionElement;
    let payee;

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

      wallet = {
        id: 1
      };

      payee = {
        id: 2,
        name: 'mcd',
        cashtag: 'mcd'
      };

      const walletResponse = { data: wallet };
      SInfo.setItem.mockResolvedValue();
      SInfo.getItem.mockResolvedValue(JSON.stringify(user));

      getWalletByUserId.mockResolvedValue(walletResponse);
      checkPayee.mockResolvedValue(payee);

      const navigation = {
        navigate: jest.fn()
      };

      wrapper = shallow(<SendContainer navigation={navigation} />);
      await flushPromises();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('#TopUp', () => {
      beforeEach(() => {
        transferOptionElement = wrapper.find('TransactionOption');
        transferOptionElement.simulate('select', 'TOP_UP');
      });

      it('should call top up transaction endpoint with amount and wallet id', () => {
        const topUpElement = wrapper.find('TopUp');
        topUpElement.simulate('submit', '25000');

        expect(topUpWallet).toHaveBeenCalledWith(user.id, '25000', wallet.id);
      });

      it('should show render error toast if the inputted amount is invalid', async () => {
        const topUpElement = wrapper.find('TopUp');
        const expectedMessage = `Top up amount must be between IDR${MIN_TRANSACTION_AMOUNT} - IDR${MAX_TRANSACTION_AMOUNT}`;

        topUpElement.simulate('submit', '1000');

        expect(toastNotification).toHaveBeenCalledWith(
          expectedMessage,
          ERROR_NOTIFICATION_COLOR
        );
      });

      it('should show render success toast if the inputted amount is valid', async () => {
        const topUpElement = wrapper.find('TopUp');

        topUpElement.simulate('submit', '100000');
        await flushPromises();

        expect(toastNotification).toHaveBeenCalledWith(
          'Top up successful',
          SUCCESS_NOTIFICATION_COLOR
        );
      });
    });

    describe('#Transfer', () => {
      beforeEach(() => {
        transferOptionElement = wrapper.find('TransactionOption');
        transferOptionElement.simulate('select', 'TRANSFER');
      });

      it('should call top up transaction endpoint with amount and wallet id', async () => {
        const transferElement = wrapper.find('Transfer');
        transferElement.simulate('check', payee.cashtag);
        await flushPromises();
        transferElement.simulate('transfer', '25000', 'description');

        expect(transfer).toHaveBeenCalledWith(
          user.id,
          wallet.id,
          payee.id,
          '25000',
          'description'
        );
      });

      it('should show render error toast if the inputted amount is invalid', async () => {
        const expectedMessage = `Transfer amount must be between IDR${MIN_TRANSACTION_AMOUNT} - IDR${MAX_TRANSACTION_AMOUNT}`;
        const transferElement = wrapper.find('Transfer');
        transferElement.simulate('check', payee.cashtag);
        await flushPromises();
        transferElement.simulate('transfer', '1000', 'description');
        await flushPromises();

        expect(toastNotification).toHaveBeenCalledWith(
          expectedMessage,
          ERROR_NOTIFICATION_COLOR
        );
      });

      it('should show render success toast if the inputted amount is valid', async () => {
        const transferElement = wrapper.find('Transfer');
        transferElement.simulate('check', payee.cashtag);
        await flushPromises();
        transferElement.simulate('transfer', '100000');
        await flushPromises();

        expect(toastNotification).toHaveBeenCalledWith(
          'Transfer successful',
          SUCCESS_NOTIFICATION_COLOR
        );
      });
    });
  });
});
