import React from 'react';
import { shallow } from 'enzyme';
import TransactionList from './TransactionList';

describe('TransactionList', function() {
  let transactions;
  beforeEach(function() {
    transactions = [
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
      },
      {
        id: 2,
        walletId: 1,
        nominal: 100,
        type: 'deposit',
        description: 'test',
        createdAt: '2019-12-01T00:10:18.917Z',
        updatedAt: '2019-12-01T00:10:18.917Z',
        beneficiaryData: {}
      }
    ];
  });
  describe('#render', () => {
    it('should render transaction item flat list', () => {
      const wrapper = shallow(<TransactionList transactions={transactions} />);
      const TransactionItem = wrapper
        .find({ testID: 'transactionItem' })
        .props().renderItem;

      const itemWrapper = shallow(<TransactionItem item={transactions[0]} />);

      expect(itemWrapper.props().item).toEqual(transactions[0]);
    });

    it('should render key extractor transaction element id to string', () => {
      const wrapper = shallow(<TransactionList transactions={transactions} />);
      const keyExtractorTransaction = wrapper
        .find('FlatList')
        .props()
        .keyExtractor(transactions[0]);

      expect(keyExtractorTransaction).toEqual(transactions[0].id.toString());
    });
  });
});
