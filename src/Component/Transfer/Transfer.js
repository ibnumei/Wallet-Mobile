import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import styles from '../../Style/Transfer.style';
import globalStyles from '../../Style/Global.style';
import iconProfile from '../../asset/image/icon-profile.png';
import starActive from '../../asset/image/star-active.png';
import PropTypes from 'prop-types';
import FavoritePayeeList from '../FavoritePayeeList';

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cashtag: '',
      amount: '',
      isTypeCashtag: true,
      description: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.payee !== this.props.payee &&
      this.props.payee !== undefined
    ) {
      this._changeNewestCashtagAndIsType(prevProps.payee, this.props.payee);
    }
  }

  _changeNewestCashtagAndIsType() {
    this.setState({
      cashtag: this.props.payee.cashtag,
      isTypeCashtag: false
    });
  }

  _handleInput = (key, input) => {
    this.setState({
      [key]: input
    });
  };

  _handleCashtag = inputtedCashtag => {
    this.setState({
      cashtag: inputtedCashtag,
      isTypeCashtag: true
    });
  };

  _handleCheck = () => {
    const { cashtag } = this.state;
    const { onCheck } = this.props;
    this.setState({
      cashtagInput: cashtag,
      isTypeCashtag: false
    });
    onCheck(cashtag);
  };

  _renderAlert = () => {
    const { amount, description, cashtag } = this.state;
    const { onTransfer } = this.props;
    Alert.alert(
      'Confirm Transfer',
      `Do you want to transfer IDR ${amount} to $${cashtag} ? `,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Ok',
          onPress: () => {
            onTransfer(amount, description);
            this._resetState();
          }
        }
      ]
    );
  };

  _resetState = () => {
    this.setState({
      amount: '',
      description: '',
      cashtag: '',
      isTypeCashtag: true
    });
  };

  _renderOptionCheck() {
    const { isTypeCashtag } = this.state;
    const { isExist } = this.props;

    if (isTypeCashtag) {
      return this._renderChecking();
    }

    return this._renderValidityIcon(isExist);
  }

  _renderPayeeInfo = () => {
    const { payee } = this.props;
    return (
      <View style={globalStyles.detailRectangleRow}>
        <Text style={globalStyles.detailRectangleRowHeader}>{payee.name}</Text>
        <Text style={globalStyles.detailRectangleRowDescription}>
          ${payee.cashtag}
        </Text>
      </View>
    );
  };

  _renderDetailPayee() {
    const { onAddFavorite, payee } = this.props;
    return (
      <View style={globalStyles.detailRectangle}>
        <View style={styles.userInfoDetail}>
          <View style={globalStyles.detailRectangleRow}>
            <Image style={styles.userImage} source={iconProfile} />
          </View>
        </View>
        {this._renderPayeeInfo()}
        <View style={globalStyles.detailRectangleRow}>
          <TouchableOpacity
            testID="favorite"
            onPress={() => onAddFavorite(payee)}>
            <Image style={styles.favoriteIcon} source={starActive} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderOptionForm() {
    const { isTypeCashtag } = this.state;
    const { isExist } = this.props;

    if (!isTypeCashtag && isExist) {
      return (
        <>
          {this._renderDetailPayee()}
          {this._renderAmount()}
          {this._renderDescription()}
        </>
      );
    }

    return null;
  }

  _renderValidityIcon(result) {
    if (result) {
      return (
        <Text testID={'right-cashtag'} style={styles.right}>
          {'✓'}
        </Text>
      );
    }
    return (
      <Text testID={'wrong-cashtag'} style={styles.wrong}>
        {'x'}
      </Text>
    );
  }

  _renderCashtag() {
    const { cashtag } = this.state;
    return (
      <View>
        <Text style={styles.rectangleDescription}>Input the cashtag</Text>
        <View style={styles.rectangleBody}>
          <Text style={styles.cashtagIcon}>$</Text>
          <TextInput
            value={cashtag}
            testID="cashtag"
            onChangeText={this._handleCashtag}
            style={styles.inputCashtag}
            autoCapitalize="none"
          />
          {this._renderOptionCheck()}
        </View>
      </View>
    );
  }

  _renderChecking() {
    const { cashtag } = this.state;
    return (
      <TouchableOpacity
        testID={'check'}
        style={cashtag ? styles.checkingButton : styles.checkingButtonDisabled}
        disabled={!cashtag}
        onPress={this._handleCheck}>
        <Text style={styles.checkText}>{'Check'}</Text>
      </TouchableOpacity>
    );
  }

  _renderAmount() {
    const { amount } = this.state;
    return (
      <View style={styles.inputBox}>
        <Text style={styles.rectangleDescription}>Amount</Text>
        <View style={styles.rectangleBody}>
          <Text style={styles.IDRIcon}>IDR</Text>
          <TextInput
            value={amount}
            keyboardType="number-pad"
            testID="amount"
            onChangeText={text => this._handleInput('amount', text)}
            style={styles.inputAmount}
          />
        </View>
      </View>
    );
  }

  _renderDescription() {
    const { description } = this.state;
    return (
      <View style={styles.inputBox}>
        <Text style={styles.rectangleDescription}>Description (Optional)</Text>
        <View style={styles.rectangleBody}>
          <TextInput
            value={description}
            testID="description"
            onChangeText={text => this._handleInput('description', text)}
            style={styles.inputText}
          />
        </View>
      </View>
    );
  }

  _renderTransfer() {
    const { isTypeCashtag } = this.state;
    const { isExist } = this.props;
    if (!isTypeCashtag && isExist) {
      return (
        <TouchableOpacity
          testID="transfer"
          onPress={this._renderAlert}
          style={styles.transferButton}>
          <Text style={styles.selectedApply}>{'Transfer'}</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { payee, favoritePayees, onFavorite } = this.props;
    return (
      <View style={styles.transferCard}>
        <FavoritePayeeList
          favoritePayees={favoritePayees}
          onFavorite={onFavorite}
        />
        <View style={styles.inputTransferForm}>
          {this._renderCashtag()}
          {!!payee && this._renderOptionForm()}
        </View>
        {!!payee && this._renderTransfer()}
      </View>
    );
  }
}

Transfer.propTypes = {
  onCheck: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  isExist: PropTypes.bool.isRequired,
  payee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cashtag: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    profileImage: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  })
};

export default Transfer;
