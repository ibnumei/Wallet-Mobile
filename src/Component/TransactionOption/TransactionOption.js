import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption
} from 'react-native-popup-menu';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Style/TransferOption.style';
import constants from '../../Constant';
import PropTypes from 'prop-types';

const { TYPE_TRANSFER, TYPE_TOP_UP } = constants;

class TransactionOption extends Component {
  _handlePress = value => {
    const { onSelect } = this.props;
    onSelect(value);
  };

  _renderTransfer() {
    return (
      <View testID={'transfer'} style={styles.box}>
        <View style={styles.iconBox}>
          <Text style={styles.transactionType}>{'Transfer'}</Text>
          <View style={styles.insideBox}>
            <FontAwesomeIcon icon={faSortDown} color={'white'} size={25} />
          </View>
        </View>
      </View>
    );
  }

  _renderTopUp() {
    return (
      <View testID={'top-up'} style={styles.box}>
        <View style={styles.iconBox}>
          <Text style={styles.transactionType}>{'Top Up'}</Text>
          <View style={styles.insideBox}>
            <FontAwesomeIcon icon={faSortDown} color={'white'} size={25} />
          </View>
        </View>
      </View>
    );
  }

  _renderOption() {
    const { transactionType } = this.props;
    if (transactionType === TYPE_TOP_UP) {
      return this._renderTopUp();
    }
    return this._renderTransfer();
  }

  render() {
    return (
      <Menu>
        <MenuTrigger>{this._renderOption()}</MenuTrigger>
        <MenuOptions testID="send-option">
          <MenuOption
            testID="transfer-option"
            value={TYPE_TRANSFER}
            text="Transfer"
            onSelect={this._handlePress}
          />
          <MenuOption
            testID="top-up-option"
            value={TYPE_TOP_UP}
            text="Top Up"
            onSelect={this._handlePress}
          />
        </MenuOptions>
      </Menu>
    );
  }
}

TransactionOption.propTypes = {
  onSelect: PropTypes.func.isRequired,
  transactionType: PropTypes.string.isRequired
};

export default TransactionOption;
