import React from 'react';
import { FlatList } from 'react-native';
import TransactionItem from '../Component/TransactionItem';
import PropTypes from 'prop-types';

class TransactionList extends React.Component {
  render() {
    const { transactions } = this.props;
    return (
      <FlatList
        testID="transactionItem"
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TransactionItem item={item} />}
      />
    );
  }
}

TransactionList.defaultProps = {
  transactions: []
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      walletId: PropTypes.number,
      nominal: PropTypes.number,
      type: PropTypes.string,
      description: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      beneficiaryData: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    })
  )
};

export default TransactionList;
