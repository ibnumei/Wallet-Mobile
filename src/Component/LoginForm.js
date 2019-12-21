import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import loginFormStyles from '../Style/LoginForm.style';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  _onChangeHandler = (key, text) => {
    this.setState({
      [key]: text
    });
  };

  _handleLogin = async () => {
    const { onLogin } = this.props;
    const { email, password } = this.state;

    const newItem = {
      email,
      password
    };
    this.setState({
      email: '',
      password: ''
    });
    onLogin(newItem);
  };

  render() {
    return (
      <View style={loginFormStyles.box}>
        <Text style={loginFormStyles.formTitle}> Welcome Back! </Text>
        <Text style={loginFormStyles.formSubtitle}>
          {' '}
          Please login to continue{' '}
        </Text>
        <TextInput
          testID={'email'}
          placeholder={'Email. . .'}
          style={loginFormStyles.textInput}
          onChangeText={text => this._onChangeHandler('email', text)}
          value={this.state.email}
          autoCapitalize="none"
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
        />
        <TextInput
          testID={'password'}
          placeholder={'Password. . .'}
          secureTextEntry={true}
          style={loginFormStyles.textInput}
          onChangeText={text => this._onChangeHandler('password', text)}
          value={this.state.password}
        />
        <TouchableOpacity
          style={loginFormStyles.loginButton}
          testID="login-button"
          onPress={this._handleLogin}>
          <Text style={loginFormStyles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginForm;
