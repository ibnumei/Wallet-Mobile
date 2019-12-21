import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../Style/TransactionFilterDescription.style';
/**
 * Represents input field for filter of transaction list
 */
class TransactionFilterDescription extends React.PureComponent {
  _handleChange = text => {
    const { onFilter } = this.props;
    onFilter(text);
  };

  render() {
    return (
      <View style={styles.box}>
        <TextInput
          testID="inputFilter"
          style={styles.inputFilter}
          placeholder="description"
          onChangeText={this._handleChange}
        />
      </View>
    );
  }
}

TransactionFilterDescription.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default TransactionFilterDescription;
