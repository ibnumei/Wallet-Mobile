import React from 'react';
import { View, Text, Image } from 'react-native';
import moment from 'moment';
import transactionTopUp from '../asset/image/transaction-top-up.png';
import transactionReceive from '../asset/image/transaction-receive.png';
import transactionTransfer from '../asset/image/transaction-transfer.png';
import transactionItemStyles from '../Style/TransactionItem.style';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import globalStyles from '../Style/Global.style';

class TransactionItem extends React.PureComponent {
  _getIcon = (type, beneficiaryData) => {
    if (type === TransactionItem.TYPE.DEPOSIT && beneficiaryData) {
      return transactionReceive;
    }
    if (type === TransactionItem.TYPE.WITHDRAW) {
      return transactionTransfer;
    }
    return transactionTopUp;
  };

  _renderType = (type, beneficiaryData) => {
    const icon = this._getIcon(type, beneficiaryData);
    return (
      <View style={transactionItemStyles.type}>
        <Image
          testID="top-up"
          style={transactionItemStyles.icon}
          source={icon}
        />
        <Text testID="transactionType" style={globalStyles.fontType}>
          {type}
        </Text>
      </View>
    );
  };

  _getDescription = item => {
    const { beneficiaryData, description, type } = item;
    if (type === TransactionItem.TYPE.WITHDRAW && beneficiaryData) {
      return `Transfer to \$${beneficiaryData.cashtag}\n${description}`;
    }
    if (type === TransactionItem.TYPE.DEPOSIT && beneficiaryData) {
      return `Receive from \$${beneficiaryData.cashtag}\n${description}`;
    }
    return description;
  };

  _getNominalStyle = type => {
    if (type === TransactionItem.TYPE.DEPOSIT) {
      return transactionItemStyles.nominalDeposit;
    }
    return transactionItemStyles.nominalWithdraw;
  };

  _renderDetail = item => {
    const { createdAt, nominal, type } = item;
    const textDescription = this._getDescription(item);
    const styleNominal = this._getNominalStyle(type);
    return (
      <View>
        <Text testID="transactionDate" style={globalStyles.fontType}>
          {moment(createdAt).format(TransactionItem.FORMATS.date)}
        </Text>
        <Text
          testID="transactionNominal"
          style={[
            transactionItemStyles.nominal,
            styleNominal,
            globalStyles.fontType
          ]}>
          {'IDR ' + numeral(nominal).format(TransactionItem.FORMATS.currency)}
        </Text>
        <Text testID="transactionDescription" style={globalStyles.fontType}>
          {textDescription}
        </Text>
      </View>
    );
  };

  render() {
    const { item } = this.props;
    const { type, beneficiaryData } = item;
    const renderedType = this._renderType(type, beneficiaryData);
    const renderedDetail = this._renderDetail(item);
    return (
      <View style={transactionItemStyles.item}>
        {renderedType}
        {renderedDetail}
      </View>
    );
  }
}

TransactionItem.FORMATS = {
  date: 'YYYY-MM-DD (H:mm:ss A)',
  currency: '0,0[.]00'
};

TransactionItem.TYPE = {
  WITHDRAW: 'withdraw',
  DEPOSIT: 'deposit'
};
TransactionItem.defaultProps = {
  transactions: {}
};

TransactionItem.propTypes = {
  item: PropTypes.shape({
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
};

export default TransactionItem;
