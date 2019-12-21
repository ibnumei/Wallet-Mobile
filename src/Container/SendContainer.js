import SInfo from 'react-native-sensitive-info';
import React from 'react';
import TransactionService from '../Service/TransactionService';
import { Image, Text, View } from 'react-native';
import globalStyles from '../Style/Global.style';
import TopUp from '../Component/TopUp/TopUp';
import Transfer from '../Component/Transfer/Transfer';
import WalletService from '../Service/WalletService';
import TransactionOption from '../Component/TransactionOption/TransactionOption';
import FavoritePayeeService from '../Service/FavoritePayeeService';
import styles from '../Style/SendContainer.style';
import mainLogo from '../asset/image/logos/yb-logo.png';
import Notification from '../Component/Notification';
import constant from '../Constant';

const { ERROR_NOTIFICATION_COLOR, SUCCESS_NOTIFICATION_COLOR } = constant;
const { toastNotification } = Notification;
const { topUpWallet, checkPayee, transfer } = TransactionService;
const { getWalletByUserId } = WalletService;
const { getFavoritePayees, addFavoritePayee } = FavoritePayeeService;
const {
  MIN_TRANSACTION_AMOUNT,
  MAX_TRANSACTION_AMOUNT,
  TYPE_TRANSFER
} = constant;

class SendContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      wallet: {},
      successMessage: '',
      errorMessage: '',
      isExist: false,
      payee: {},
      transactionType: TYPE_TRANSFER,
      favoritePayeeList: []
    };
  }

  async componentDidMount() {
    await this._fetchUser();
    await this._fetchWallet();
    await this._getListFavoritPayees();
  }

  async _fetchUser() {
    const localUserData = await SInfo.getItem('User', {});
    const storageUser = JSON.parse(localUserData);
    this.setState({
      user: storageUser
    });
  }

  async _fetchWallet() {
    const { user } = this.state;
    const { data: wallet } = await getWalletByUserId(user.id);
    this.setState({
      wallet
    });
  }

  async _getListFavoritPayees() {
    const { user } = this.state;

    const { data } = await getFavoritePayees(user.id);
    this.setState({
      favoritePayeeList: data
    });
  }

  _handleTopUp = amount => {
    this.setState({ errorMessage: '', successMessage: '' });
    const isBelowMinimumTransaction =
      parseInt(amount, 10) < MIN_TRANSACTION_AMOUNT;
    const isAboveMaximumTransaction =
      parseInt(amount, 10) > MAX_TRANSACTION_AMOUNT;
    if (isBelowMinimumTransaction || isAboveMaximumTransaction) {
      return this.setState({
        errorMessage: `Top up amount must be between IDR${MIN_TRANSACTION_AMOUNT} - IDR${MAX_TRANSACTION_AMOUNT}`
      });
    }
    this._topUpAmount(amount);
  };

  _handleTransfer = (amount, description) => {
    this.setState({ errorMessage: '', successMessage: '' });
    const isBelowMinimumTransaction =
      parseInt(amount, 10) < MIN_TRANSACTION_AMOUNT;
    const isAboveMaximumTransaction =
      parseInt(amount, 10) > MAX_TRANSACTION_AMOUNT;
    if (isBelowMinimumTransaction || isAboveMaximumTransaction) {
      return this.setState({
        errorMessage: `Transfer amount must be between IDR${MIN_TRANSACTION_AMOUNT} - IDR${MAX_TRANSACTION_AMOUNT}`
      });
    }
    this._transferAmount(amount, description);
  };

  _handleCheck = async inputtedCashtag => {
    try {
      const payee = await checkPayee(inputtedCashtag);
      this.setState({
        payee,
        isExist: !!payee,
        errorMessage: '',
        successMessage: ''
      });
    } catch (error) {
      this.setState({
        isExist: false,
        errorMessage: '',
        successMessage: ''
      });
    }
  };

  _handleTransactionType = selectedTrxType => {
    this.setState({
      transactionType: selectedTrxType,
      errorMessage: '',
      successMessage: ''
    });
  };

  _handleFavoritePayee = favoritePayee => {
    this.setState({
      payee: { ...favoritePayee },
      isExist: true,
      errorMessage: '',
      successMessage: ''
    });
  };

  async _transferAmount(nominal, description) {
    this.setState({ errorMessage: '', successMessage: '' });
    const { navigation } = this.props;
    const { user, payee, wallet } = this.state;
    try {
      await transfer(user.id, wallet.id, payee.id, nominal, description);
      this.setState({ successMessage: 'Transfer successful' });
      navigation.navigate('Dashboard');
    } catch (error) {
      this.setState({ errorMessage: 'Transfer failed' });
    }
  }

  async _topUpAmount(amount) {
    this.setState({ errorMessage: '', successMessage: '' });
    const { navigation } = this.props;
    const { user, wallet } = this.state;
    try {
      await topUpWallet(user.id, amount, wallet.id);
      this.setState({ successMessage: 'Top up successful' });
      navigation.navigate('Dashboard');
    } catch (error) {
      this.setState({ errorMessage: 'Top up failed' });
    }
  }

  _renderTransfer() {
    const { payee, isExist, favoritePayeeList } = this.state;
    return (
      <Transfer
        onCheck={this._handleCheck}
        onTransfer={this._handleTransfer}
        payee={payee}
        isExist={isExist}
        favoritePayees={favoritePayeeList}
        onFavorite={this._handleFavoritePayee}
        onAddFavorite={this._handleAddFavorite}
      />
    );
  }

  _handleAddFavorite = async payee => {
    const { user } = this.state;
    await addFavoritePayee(user.id, payee.id);
    await this._getListFavoritPayees();
  };

  _renderTopUp() {
    return <TopUp onSubmit={this._handleTopUp} />;
  }

  _renderOption() {
    const { transactionType } = this.state;
    if (transactionType === TYPE_TRANSFER) {
      return <>{this._renderTransfer()}</>;
    }
    return <>{this._renderTopUp()}</>;
  }

  _renderNotification = () => {
    const { errorMessage, successMessage } = this.state;
    if (errorMessage) {
      toastNotification(errorMessage, ERROR_NOTIFICATION_COLOR);
    }
    if (successMessage) {
      toastNotification(successMessage, SUCCESS_NOTIFICATION_COLOR);
    }
  };

  render() {
    const { transactionType } = this.state;
    return (
      <View>
        <View style={globalStyles.header}>
          <View style={styles.flexDirection}>
            <Image source={mainLogo} style={styles.mainLogo} />
            <Text style={styles.title}>wallet</Text>
          </View>
        </View>
        <View style={globalStyles.body}>
          {this._renderNotification()}
          <View style={styles.flexDirection}>
            <View style={styles.flexCard} />
            <TransactionOption
              onSelect={this._handleTransactionType}
              transactionType={transactionType}
            />
          </View>
          {this._renderOption()}
        </View>
      </View>
    );
  }
}

export default SendContainer;
