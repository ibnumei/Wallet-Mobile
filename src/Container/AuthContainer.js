import React from 'react';
import { ActivityIndicator, StatusBar, Image, View, Text } from 'react-native';
import StorageService from '../Service/StorageService';
import mainLogo from '../asset/image/logos/yb-logo.png';
import styles from '../Style/AuthContainer.style';

const { getToken } = StorageService;
export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await getToken();
    setTimeout(() => {
      if (userToken) {
        return this.props.navigation.navigate('HomeStack');
      }

      return this.props.navigation.navigate('Login');
    }, 2000);
  };

  render() {
    return (
      <View style={styles.authBox}>
        <Image source={mainLogo} style={styles.authLogo} />
        <Text style={styles.title}>Wallet</Text>
        <ActivityIndicator
          size="large"
          color="gray"
          style={styles.activityIndicator}
        />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
