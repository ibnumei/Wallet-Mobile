import { shallow } from 'enzyme';
import React from 'react';
import TransactionOption from './TransactionOption';

describe('TransactionOption', () => {
  let transferWrapper;
  let topUpWrapper;
  let onSelectMock;
  let transferTransaction;
  let topUpTransaction;

  describe('#render', () => {
    beforeEach(() => {
      onSelectMock = jest.fn();
      transferTransaction = 'TRANSFER';
      topUpTransaction = 'TOP_UP';
      transferWrapper = shallow(
        <TransactionOption
          onSelect={onSelectMock}
          transactionType={transferTransaction}
        />
      );

      topUpWrapper = shallow(
        <TransactionOption
          onSelect={onSelectMock}
          transactionType={topUpTransaction}
        />
      );
    });

    it('should render transfer button when choose the transfer', () => {
      expect(transferWrapper.find({ testID: 'transfer' })).toHaveLength(1);
      expect(transferWrapper.find({ testID: 'top-up' })).toHaveLength(0);
    });

    it('should render top up botton when choose the top-up', () => {
      expect(topUpWrapper.find({ testID: 'transfer' })).toHaveLength(0);
      expect(topUpWrapper.find({ testID: 'top-up' })).toHaveLength(1);
    });

    it('should render MenuOptions transfer and top up', () => {
      expect(transferWrapper.find({ testID: 'transfer-option' })).toHaveLength(
        1
      );
      expect(transferWrapper.find({ testID: 'top-up-option' })).toHaveLength(1);
    });

    it('should call onSelect with top-up value', () => {
      transferWrapper
        .find({ testID: 'transfer-option' })
        .simulate('select', transferTransaction);

      expect(onSelectMock).toBeCalledWith(transferTransaction);
    });
  });
});
