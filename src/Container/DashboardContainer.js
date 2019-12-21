import SInfo from 'react-native-sensitive-info';
import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import UserInfo from '../Component/UserInfo';
import WalletInfo from '../Component/WalletInfo';
import WalletService from '../Service/WalletService';
import TransactionService from '../Service/TransactionService';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import TransactionItem from '../Component/TransactionItem';
import globalStyles from '../Style/Global.style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import mainLogo from '../asset/image/logos/yb-logo.png';
import styles from '../Style/DashboardContainer.style';

const { getWalletByUserId } = WalletService;
const { getTransactionByUserId } = TransactionService;

export class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      wallet: {},
      recentTransactions: []
    };
  }

  _initData = async () => {
    await this._fetchUser();
    await this._fetchWallet();
    await this._fetchRecentTransactions();
  };

  async componentDidMount() {
    await this._initData();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this._initData();
    }
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

  async _fetchRecentTransactions() {
    const { user, wallet } = this.state;
    const { data: recentTransactions } = await getTransactionByUserId(
      user.id,
      5,
      wallet.id
    );
    this.setState({
      recentTransactions
    });
  }

  _renderRecentTransaction = recentTransactions => {
    return recentTransactions.map(transactionItem => {
      return (
        <TransactionItem
          key={transactionItem.id.toString()}
          item={transactionItem}
        />
      );
    });
  };

  _navigateToTopUp = () => {
    const { navigation } = this.props;
    navigation.navigate('Send');
  };

  _navigateToTransaction = () => {
    const { navigation } = this.props;
    navigation.navigate('Transactions');
  };

  render() {
    const { user, wallet, recentTransactions } = this.state;
    const { navigation } = this.props;
    const renderedRecentTransaction = this._renderRecentTransaction(
      recentTransactions
    );
    return (
      <>
        <View style={globalStyles.header}>
          <View style={styles.flexDirection}>
            <Image source={mainLogo} style={styles.mainLogo} />
            <Text style={styles.title}>wallet</Text>
          </View>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            style={styles.icon}
            color={'#444444'}
            size={24}
            onPress={async () => {
              await SInfo.deleteItem('Token', {});
              navigation.navigate('Login');
            }}
          />
        </View>
        <ScrollView style={[globalStyles.dashboardBody, styles.flexBox]}>
          <UserInfo user={user} />
          <WalletInfo wallet={wallet} onIconClick={this._navigateToTopUp} />
          <View style={globalStyles.box}>
            <View style={globalStyles.boxHeader}>
              <Text style={globalStyles.boxTitle}>Recent transactions</Text>
              <TouchableOpacity onPress={this._navigateToTransaction}>
                <Text style={globalStyles.boxLink}>Show all</Text>
              </TouchableOpacity>
            </View>
            {renderedRecentTransaction}
          </View>
        </ScrollView>
      </>
    );
  }
}

export default withNavigationFocus(DashboardContainer);
