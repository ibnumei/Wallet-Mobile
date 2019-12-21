import React from 'react';
import LoginForm from '../Component/LoginForm';
import AuthUserService from '../Service/AuthService';
import { View, ImageBackground } from 'react-native';
import backgroundPattern from '../asset/image/playstation-pattern.png';
import loginContainerStyles from '../Style/LoginContainer.style';
import Notification from '../Component/Notification';
import constant from '../Constant';

const { ERROR_NOTIFICATION_COLOR, WRONG_PASSWORD_EMAIL } = constant;
const { toastNotification } = Notification;

const { login } = AuthUserService;

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  _onLoginHandler = async inputedData => {
    this.setState({
      errorMessage: ''
    });
    const { navigation } = this.props;
    try {
      await login(inputedData);
      navigation.navigate('HomeStack');
    } catch (error) {
      this.setState({
        errorMessage: WRONG_PASSWORD_EMAIL
      });
    }
  };

  _renderNotification = () => {
    const { errorMessage } = this.state;
    if (errorMessage) {
      toastNotification(errorMessage, ERROR_NOTIFICATION_COLOR);
    }
  };

  render() {
    return (
      <View style={loginContainerStyles.loginBox}>
        {this._renderNotification()}
        <ImageBackground
          resizeMode="repeat"
          source={backgroundPattern}
          style={loginContainerStyles.background}>
          <LoginForm onLogin={this._onLoginHandler} />
        </ImageBackground>
      </View>
    );
  }
}

export default LoginContainer;
