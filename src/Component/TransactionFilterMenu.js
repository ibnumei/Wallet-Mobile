import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import TransactionFilterAmount from './TransactionFilterAmount';
import styles from '../Style/TransactionFilterMenu.style';
import TransactionSort from './TransactionSort';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
const { SlideInMenu } = renderers;
import constants from '../Constant';
import PropTypes from 'prop-types';

const { MIN_TRANSACTION_AMOUNT, MAX_TRANSACTION_AMOUNT } = constants;

class TransactionFilterMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedSort: 'newest-date',
      multiSliderValue: [MIN_TRANSACTION_AMOUNT, MAX_TRANSACTION_AMOUNT]
    };
  }

  _handleAmount = values => {
    this.setState({
      multiSliderValue: values
    });
  };

  _handleSort = selectedSort => {
    this.setState({
      selectedSort: selectedSort
    });
  };

  _handleSubmit = () => {
    const { onSelect } = this.props;
    const { multiSliderValue, selectedSort } = this.state;
    onSelect(multiSliderValue, selectedSort);
    this._instance.close();
  };

  _renderMenuOptions() {
    const { multiSliderValue, selectedSort } = this.state;
    return (
      <MenuOptions style={styles.optionsContainer}>
        <View>
          <TransactionFilterAmount
            testID={'transaction-filter-amount'}
            selectedMinValue={multiSliderValue[0]}
            selectedMaxValue={multiSliderValue[1]}
            onChange={this._handleAmount}
          />
          <TransactionSort
            testID={'transaction-sort'}
            onSelect={this._handleSort}
            selectedSort={selectedSort}
          />
          <TouchableOpacity
            testID={'transaction-apply'}
            onPress={this._handleSubmit}
            style={styles.applyButton}>
            <Text style={styles.selectedApply}>{'Apply'}</Text>
          </TouchableOpacity>
        </View>
      </MenuOptions>
    );
  }

  render() {
    return (
      <View style={styles.iconBox}>
        <Menu
          testID="sortType"
          renderer={SlideInMenu}
          ref={ref => {
            this._instance = ref;
          }}>
          <MenuTrigger>
            <FontAwesomeIcon
              icon={faFilter}
              style={styles.iconFilter}
              color={'white'}
              size={20}
            />
          </MenuTrigger>
          {this._renderMenuOptions()}
        </Menu>
      </View>
    );
  }
}

TransactionFilterMenu.propTypes = {
  onSelect: PropTypes.func.isRequired
};

export default TransactionFilterMenu;
