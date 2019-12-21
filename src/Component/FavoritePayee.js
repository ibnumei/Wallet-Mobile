import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../Style/FavoritePayee.style';
import iconProfile from '../asset/image/icon-profile.png';

class FavoritePayee extends Component {
  _handleFavorite = () => {
    const { onFavorite, payee } = this.props;
    onFavorite(payee);
  };

  _renderPayeeInfo() {
    const { payee } = this.props;
    const payeeFirstName = payee.name.split(' ')[0];
    return (
      <View style={styles.detailRectangleRow}>
        <Text style={styles.detailRectangleRowHeader}>{payeeFirstName}</Text>
        <Text style={styles.detailRectangleRowDescription}>
          ${payee.cashtag}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity testID="favorite" onPress={this._handleFavorite}>
        <View testID={'card-payee'} style={styles.cardFavorite}>
          <View style={styles.detailRectangle}>
            <View style={styles.userInfoDetail}>
              <View style={styles.detailRectangleRow}>
                <Image style={styles.userImage} source={iconProfile} />
              </View>
            </View>
            {this._renderPayeeInfo()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default FavoritePayee;
