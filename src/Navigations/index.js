import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import DashboardContainer from '../Container/DashboardContainer';
import TransactionContainer from '../Container/TransactionContainer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faExchangeAlt,
  faHome,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { createStackNavigator } from 'react-navigation-stack';
import LoginContainer from '../Container/LoginContainer';
import { createSwitchNavigator } from 'react-navigation';
import indexStyles from '../Style/index.style';
import AuthContainer from '../Container/AuthContainer';
import SendContainer from '../Container/SendContainer';

const HomeStack = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardContainer,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesomeIcon
            icon={faHome}
            style={indexStyles.navigator}
            color={tintColor}
            size={24}
          />
        )
      }
    },
    Send: {
      screen: SendContainer,
      navigationOptions: {
        tabBarLabel: 'Send',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesomeIcon
            icon={faPaperPlane}
            style={indexStyles.navigator}
            color={tintColor}
            size={24}
          />
        )
      }
    },
    Transactions: {
      screen: TransactionContainer,
      navigationOptions: {
        tabBarLabel: 'Transactions',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesomeIcon
            icon={faExchangeAlt}
            style={indexStyles.navigator}
            color={tintColor}
            size={24}
          />
        )
      }
    }
  },
  {
    initialRouteName: 'Dashboard',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#F79C06',
      inactiveTintColor: '#c8cbc6',
      style: {
        backgroundColor: 'white',
        borderTopColor: 'white'
      }
    }
  }
);

const LoginStack = createStackNavigator(
  {
    Login: { screen: LoginContainer }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerShown: false
    }
  }
);

export default createSwitchNavigator(
  {
    Authentication: AuthContainer,
    HomeStack: HomeStack,
    Login: LoginStack
  },
  { initialRouteName: 'Authentication' }
);
