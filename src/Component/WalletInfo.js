import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../Style/Global.style';
import walletInfoStyles from '../Style/WalletInfo.style';
import topUpIcon from '../asset/image/top-up.png';
import transferIcon from '../asset/image/transfer.png';
import PropTypes from 'prop-types';
import TransactionItem from './TransactionItem';
import numeral from 'numeral';

class WalletInfo extends React.PureComponent {
  _navigateToTopUp = () => {
    const { onIconClick } = this.props;
    onIconClick();
  };
  _renderActionTopUp = () => {
    return (
      <TouchableOpacity
        testID={'top-up'}
        style={walletInfoStyles.action}
        onPress={this._navigateToTopUp}>
        <Image style={walletInfoStyles.actionIcon} source={topUpIcon} />
        <Text style={globalStyles.fontType}>Top up</Text>
      </TouchableOpacity>
    );
  };

  _renderActionTransfer = () => {
    return (
      <TouchableOpacity
        style={walletInfoStyles.action}
        onPress={this._navigateToTopUp}>
        <Image
          testID="transfer"
          style={walletInfoStyles.actionIcon}
          source={transferIcon}
        />
        <Text style={globalStyles.fontType}>Transfer</Text>
      </TouchableOpacity>
    );
  };

  _renderActions = () => {
    const renderedTopUp = this._renderActionTopUp();
    const renderedTransfer = this._renderActionTransfer();
    return (
      <View style={[walletInfoStyles.actionIconBox]}>
        {renderedTopUp}
        {renderedTransfer}
      </View>
    );
  };

  _renderNominal = nominal => {
    const textNominal = numeral(nominal).format(
      TransactionItem.FORMATS.currency
    );
    return (
      <Text
        style={[walletInfoStyles.balance, globalStyles.fontType]}
        testID="balance">
        {textNominal}
      </Text>
    );
  };

  render() {
    const { wallet } = this.props;
    const renderedActions = this._renderActions();
    const renderedNominal = this._renderNominal(wallet.balance);
    return (
      <View style={globalStyles.box}>
        <Text style={[globalStyles.boxHeader, globalStyles.boxTitle]}>
          Wallet's balance
        </Text>
        <Text style={walletInfoStyles.titleBalance}>Total balance</Text>
        <View style={walletInfoStyles.currency}>
          <Text style={walletInfoStyles.idr}>IDR </Text>
          {renderedNominal}
        </View>
        {renderedActions}
      </View>
    );
  }
}

WalletInfo.defaultProps = {
  wallet: {}
};

WalletInfo.propTypes = {
  wallet: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    balance: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
  onIconClick: PropTypes.func.isRequired
};

export default WalletInfo;
