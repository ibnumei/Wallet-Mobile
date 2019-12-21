import React from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import globalStyles from '../../Style/Global.style';
import PropTypes from 'prop-types';

class TopUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      amountInput: ''
    };
  }

  _renderAlert = () => {
    const { amountInput } = this.state;
    const { onSubmit } = this.props;
    Alert.alert(
      'Confirm Top Up',
      `Top Up Nominal is IDR ${amountInput}.\nConfirm top up payment ? `,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Ok',
          onPress: () => {
            onSubmit(amountInput);
            this.setState({ amountInput: '' });
          }
        }
      ]
    );
  };

  render() {
    const { amountInput } = this.state;
    return (
      <View>
        <View style={globalStyles.rectangle}>
          <Text style={globalStyles.rectangleDescription}>Top up nominal</Text>
          <View style={globalStyles.rectangleBody}>
            <Text style={globalStyles.topUpIDR}>IDR</Text>
            <TextInput
              value={amountInput}
              keyboardType="number-pad"
              testID="topUpInputField"
              onChangeText={text => this.setState({ amountInput: text })}
              style={globalStyles.topUpInput}
            />
          </View>
        </View>
        <TouchableOpacity
          title="Top Up"
          onPress={this._renderAlert}
          testID="topUpButton"
          type="button"
          style={globalStyles.topUpButton}>
          <Text style={globalStyles.toUpButtonText}>Top Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

TopUp.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default TopUp;
