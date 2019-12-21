/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, createAppContainer } from 'react-navigation';
import AppNavigator from './Navigations';
import { MenuProvider } from 'react-native-popup-menu';
import axios from 'axios';
import StorageService from './Service/StorageService';
import { StyleSheet } from 'react-native';
import appStyles from '../src/Style/App.style';

const AppContainer = createAppContainer(AppNavigator);
const { getToken } = StorageService;

const applyAxiosConfig = async () => {
  axios.interceptors.request.use(
    async config => {
      const token = await getToken();
      return {
        ...config,
        headers: { Authorization: token }
      };
    },
    error => {
      return Promise.reject(error);
    }
  );
};

applyAxiosConfig();

const App: () => React$Node = () => {
  return (
    <MenuProvider customStyles={menuProviderStyles}>
      <SafeAreaView
        style={appStyles.safeAreaView}
        forceInset={{ bottom: 'never' }}>
        <AppContainer />
      </SafeAreaView>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'gray',
    opacity: 0.5
  }
});

const menuProviderStyles = {
  backdrop: styles.backdrop
};

export default App;
