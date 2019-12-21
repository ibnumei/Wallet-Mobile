import { shallow } from 'enzyme';
import React from 'react';
import LoginContainer from './LoginContainer';
import AuthService from '../Service/AuthService.js';

const { login } = AuthService;

jest.mock('../Service/AuthService', () => ({
  login: jest.fn()
}));

describe('Login', () => {
  let navigation;
  let wrapper;
  let inputedData;

  beforeEach(async () => {
    navigation = {
      navigate: jest.fn()
    };
    wrapper = shallow(<LoginContainer navigation={navigation} />);
    inputedData = {
      email: 'a@a.a',
      password: '123123asdf'
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#render', () => {
    it('should call the login function with the data', async () => {
      wrapper.find('LoginForm').simulate('login', inputedData);
      await flushPromises();

      expect(login).toHaveBeenCalledWith(inputedData);
      expect(navigation.navigate).toHaveBeenCalledWith('HomeStack');
    });
  });
});
