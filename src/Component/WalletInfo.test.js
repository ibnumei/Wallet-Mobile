import React from 'react';
import { shallow } from 'enzyme';
import WalletInfo from './WalletInfo';
import TransactionItem from './TransactionItem';
import numeral from 'numeral';

describe('WalletInfo', () => {
  let wrapper;
  let expectedBalance;
  let onIconClickMock;
  describe('#render', () => {
    beforeEach(() => {
      onIconClickMock = jest.fn();
      const wallet = {
        id: 1,
        userId: 1,
        balance: 50000,
        createdAt: '2019-12-12T16:25:45.774Z',
        updatedAt: '2019-12-12T16:25:45.774Z'
      };
      expectedBalance = numeral(wallet.balance).format(
        TransactionItem.FORMATS.currency
      );

      wrapper = shallow(
        <WalletInfo wallet={wallet} onIconClick={onIconClickMock} />
      );
    });

    it('should render balance', () => {
      const balance = wrapper.find({ testID: 'balance' });

      expect(balance.props().children).toBe(expectedBalance);
    });

    it('should call onIconClick when the top-up button is invoked', () => {
      wrapper.find({ testID: 'top-up' }).simulate('press');

      expect(onIconClickMock).toBeCalled();
    });
  });
});
