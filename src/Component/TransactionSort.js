import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../Style/TransactionSort.style';
import globalStyles from '../Style/Global.style';
import PropTypes from 'prop-types';

class TransactionSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortTypes: [
        'newest-date',
        'oldest-date',
        'highest-amount',
        'lowest-amount'
      ]
    };
  }

  _handleStyle = selected => {
    const { selectedSort } = this.props;
    if (selected === selectedSort) {
      return styles.selectedSort;
    }
    return styles.unselectedSort;
  };

  _handleTextStyle = selected => {
    const { selectedSort } = this.props;
    if (selected === selectedSort) {
      return styles.selectedText;
    }
    return styles.unselectedText;
  };

  _onSelect = selectedSort => {
    const { onSelect } = this.props;
    onSelect(selectedSort);
  };

  _renderSort() {
    const { sortTypes } = this.state;
    const sortButton = sortTypes.map(type => {
      return (
        <TouchableOpacity
          testID={type}
          onPress={() => this._onSelect(type)}
          style={this._handleStyle(type)}
          key={type}>
          <Text style={this._handleTextStyle(type)}>{type}</Text>
        </TouchableOpacity>
      );
    });
    return sortButton;
  }

  render() {
    return (
      <View>
        <View style={globalStyles.boxHeaderModal}>
          <Text testID={'sort-by'} style={globalStyles.modalTitle}>
            {'Sort By'}
          </Text>
        </View>
        <View style={styles.container}>{this._renderSort()}</View>
      </View>
    );
  }
}

TransactionSort.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedSort: PropTypes.string.isRequired
};

export default TransactionSort;
