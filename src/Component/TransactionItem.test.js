import React from 'react';
import { shallow } from 'enzyme';
import TransactionItem from './TransactionItem';
import moment from 'moment';
import numeral from 'numeral';

describe('TransactionList', () => {
  describe('#render', () => {
    it('should render transactions item according to its fields', () => {
      const transaction = {
        type: 'withdraw',
        nominal: 15000,
        description: 'test',
        createdAt: '2019-12-01T00:10:18.917Z',
        updatedAt: '2019-12-01T00:10:18.917Z',
        beneficiaryData: {
          id: 2,
          name: 'Boruto',
          cashtag: 'boruto'
        }
      };
      const wrapper = shallow(<TransactionItem item={transaction} />);
      const expectedDate = moment(transaction.createdAt).format(
        TransactionItem.FORMATS.date
      );
      const expectedNominal =
        'IDR ' +
        numeral(transaction.nominal).format(TransactionItem.FORMATS.currency);

      const dateElement = wrapper.find({ testID: 'transactionDate' });
      const typeElement = wrapper.find({ testID: 'transactionType' });
      const amountElement = wrapper.find({ testID: 'transactionNominal' });
      const descriptionElement = wrapper.find({
        testID: 'transactionDescription'
      });

      expect(dateElement.props().children).toEqual(expectedDate);
      expect(typeElement.props().children).toEqual(transaction.type);
      expect(amountElement.props().children).toEqual(expectedNominal);
      expect(descriptionElement.props().children).toEqual(
        'Transfer to $boruto\n' + transaction.description
      );
    });

    it('should render transaction receive icon when the deposit and beneficiary data exist', () => {
      const transaction = {
        type: 'deposit',
        nominal: 15000,
        description: 'test',
        createdAt: '2019-12-01T00:10:18.917Z',
        updatedAt: '2019-12-01T00:10:18.917Z',
        beneficiaryData: {
          id: 2,
          name: 'Boruto',
          cashtag: 'boruto'
        }
      };
      const wrapper = shallow(<TransactionItem item={transaction} />);

      expect(wrapper.find('Image').props().source.testUri).toContain('receive');
    });

    it('should render transaction TopUp icon when the deposit and beneficiary data is not exist', () => {
      const transaction = {
        type: 'deposit',
        nominal: 15000,
        description: 'test',
        createdAt: '2019-12-01T00:10:18.917Z',
        updatedAt: '2019-12-01T00:10:18.917Z'
      };
      const wrapper = shallow(<TransactionItem item={transaction} />);

      expect(wrapper.find('Image').props().source.testUri).toContain('top-up');
    });

    it('should render description receive from when the transaction type is deposit and beneficiary data is exist', () => {
      const transaction = {
        type: 'deposit',
        nominal: 15000,
        description: 'test',
        createdAt: '2019-12-01T00:10:18.917Z',
        updatedAt: '2019-12-01T00:10:18.917Z',
        beneficiaryData: {
          id: 2,
          name: 'Boruto',
          cashtag: 'boruto'
        }
      };
      const wrapper = shallow(<TransactionItem item={transaction} />);

      expect(
        wrapper.find({ testID: 'transactionDescription' }).props().children
      ).toContain('Receive from');
    });
  });
});
