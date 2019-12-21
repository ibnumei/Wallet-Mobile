import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  let onLogin;
  let wrapper;

  beforeEach(() => {
    onLogin = jest.fn();
    wrapper = shallow(<LoginForm onLogin={onLogin} />);
    wrapper.find({ testID: 'email' }).simulate('changeText', 'Bayu');
    wrapper.find({ testID: 'password' }).simulate('changeText', '1234');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should call onClick function when the button clicked', () => {
      const expectedEmail = 'Bayu';
      const expectedPassword = '1234';

      wrapper.find({ testID: 'login-button' }).simulate('press');

      expect(onLogin).toHaveBeenCalledWith({
        email: expectedEmail,
        password: expectedPassword
      });
    });
  });
});
