import React, { Component } from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Text, View } from 'react-native';
import globalStyles from '../Style/Global.style';
import styles from '../Style/FilterAmount.style';
import numeral from 'numeral';
import constants from '../Constant';
import PropTypes from 'prop-types';

const { MIN_TRANSACTION_AMOUNT, MAX_TRANSACTION_AMOUNT } = constants;

class TransactionFilterAmount extends Component {
  _sliderOneValuesChange = values => {
    const { onChange } = this.props;
    onChange(values);
  };

  _renderTextAmount() {
    const { selectedMinValue, selectedMaxValue } = this.props;
    return (
      <View testID={'text-amount'} style={styles.textValue}>
        <Text style={styles.textColor}>
          IDR {numeral(selectedMinValue).format('0,0[.]00')}
        </Text>
        <Text style={styles.textColor}>
          {' - IDR '}
          {numeral(selectedMaxValue).format('0,0[.]00')}
        </Text>
      </View>
    );
  }

  _renderMultiSlider() {
    const { selectedMinValue, selectedMaxValue } = this.props;
    return (
      <>
        <MultiSlider
          testID={'slider-amount'}
          values={[selectedMinValue, selectedMaxValue]}
          onValuesChange={this._sliderOneValuesChange}
          sliderLength={350}
          selectedStyle={styles.selectedSliderColor}
          min={MIN_TRANSACTION_AMOUNT}
          max={MAX_TRANSACTION_AMOUNT}
          step={10000}
        />
      </>
    );
  }

  render() {
    return (
      <View>
        <View style={globalStyles.boxHeaderModal}>
          <Text style={globalStyles.modalTitle}>{'Filter Amount'}</Text>
        </View>
        <View style={styles.textContainer}>
          {this._renderTextAmount()}
          {this._renderMultiSlider()}
        </View>
      </View>
    );
  }
}

TransactionFilterAmount.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedMinValue: PropTypes.number.isRequired,
  selectedMaxValue: PropTypes.number.isRequired
};

export default TransactionFilterAmount;
