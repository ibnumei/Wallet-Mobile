import React from 'react';
import { Image, Text, View } from 'react-native';
import TransactionList from './TransactionList';
import TransactionService from '../Service/TransactionService';
import TransactionFilterDescription from '../Component/TransactionFilterDescription';
import globalStyles from '../Style/Global.style';
import SInfo from 'react-native-sensitive-info';
import TransactionFilterMenu from '../Component/TransactionFilterMenu';
import styles from '../Style/TransactionContainer.style';
import { withNavigationFocus } from 'react-navigation';
import WalletService from '../Service/WalletService';

import mainLogo from '../asset/image/logos/yb-logo.png';
const { getTransactionByUserId } = TransactionService;
const { getWalletByUserId } = WalletService;

export class TransactionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      filteredTransactionsState: [],
      filterInput: '',
      user: {},
      wallet: {}
    };
  }

  async componentDidMount() {
    this._initData();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this._initData();
    }
  }

  _initData = async () => {
    await this._fetchUser();
    await this._fetchWallet();
    await this._fetchUserTransactions();
  };

  async _fetchWallet() {
    const { user } = this.state;
    const { data: wallet } = await getWalletByUserId(user.id);
    this.setState({
      wallet
    });
  }

  _fetchUserTransactions = async () => {
    const { user, wallet } = this.state;
    try {
      const response = await getTransactionByUserId(
        user.id,
        null,
        parseInt(wallet.id, 10)
      );
      const { data } = response;
      this.setState({ transactions: data, filteredTransactionsState: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  _fetchUser = async () => {
    const localUserData = await SInfo.getItem('User', {});
    const storageUser = JSON.parse(localUserData);
    this.setState({
      user: storageUser
    });
  };

  _handleFilter = inputText => {
    this.setState({ filterInput: inputText });
  };

  _filterByAmount(minValue, maxValue, transactions) {
    const greaterThan = parseInt(minValue, 10);
    const lessThan = parseInt(maxValue, 10);

    return transactions.filter(
      transaction =>
        transaction.nominal >= greaterThan && transaction.nominal <= lessThan
    );
  }

  _sortBySelected(selectedSort, transactions) {
    if (selectedSort.includes('date')) {
      return this._sortTransactionsDate(selectedSort, transactions);
    }
    return this._sortTransactionAmount(selectedSort, transactions);
  }

  _sortTransactionAmount(sortAmount, sortedTransactions) {
    if (sortAmount === 'highest-amount') {
      return sortedTransactions.sort(
        (firstTransaction, secondTransaction) =>
          secondTransaction.nominal - firstTransaction.nominal
      );
    }
    return sortedTransactions.sort(
      (firstTransaction, secondTransaction) =>
        firstTransaction.nominal - secondTransaction.nominal
    );
  }

  _sortTransactionsDate(sortDate, sortedTransactions) {
    if (sortDate === 'oldest-date') {
      return sortedTransactions.sort(
        (firstTransaction, secondTransaction) =>
          new Date(firstTransaction.createdAt) -
          new Date(secondTransaction.createdAt)
      );
    }
    return sortedTransactions.sort(
      (firstTransaction, secondTransaction) =>
        new Date(secondTransaction.createdAt) -
        new Date(firstTransaction.createdAt)
    );
  }

  _displayTransactions() {
    const { filterInput, filteredTransactionsState } = this.state;
    return filteredTransactionsState.filter(transaction =>
      transaction.description.toLowerCase().includes(filterInput.toLowerCase())
    );
  }

  _handleFilterModal = (amountValue, selectedSort) => {
    const { transactions } = this.state;
    let filteredTransactions = [...transactions];
    filteredTransactions = this._filterByAmount(
      amountValue[0],
      amountValue[1],
      filteredTransactions
    );
    filteredTransactions = this._sortBySelected(
      selectedSort,
      filteredTransactions
    );
    this.setState({
      filteredTransactionsState: filteredTransactions
    });
  };

  render() {
    return (
      <>
        <View style={globalStyles.header}>
          <View style={styles.flexDirection}>
            <Image source={mainLogo} style={styles.mainLogo} />
            <Text style={styles.title}>wallet</Text>
          </View>
        </View>
        <View style={globalStyles.body}>
          <View style={globalStyles.box}>
            <View style={styles.filterContainer}>
              <TransactionFilterDescription onFilter={this._handleFilter} />
              <TransactionFilterMenu onSelect={this._handleFilterModal} />
            </View>
          </View>
          <View style={globalStyles.box}>
            <View style={styles.filterContainer}>
              <TransactionList transactions={this._displayTransactions()} />
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default withNavigationFocus(TransactionContainer);
