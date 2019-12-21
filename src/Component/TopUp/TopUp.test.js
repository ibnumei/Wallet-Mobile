import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'react-native';

import TopUp from './TopUp';

describe('TopUp', () => {
  let wrapper;
  let mockedOnSubmit;

  beforeEach(function() {
    mockedOnSubmit = jest.fn();
    Alert.alert = jest.fn();
    wrapper = shallow(<TopUp onSubmit={mockedOnSubmit} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should show alert when form submitted', () => {
      const inputElement = wrapper.find({ testID: 'topUpInputField' });
      inputElement.simulate('changeText', '25000');
      const buttonElement = wrapper.find({ testID: 'topUpButton' });
      buttonElement.simulate('press');

      expect(Alert.alert).toHaveBeenCalled();
    });

    it('should call onSubmit with the amount value when alert confirmed', () => {
      const inputElement = wrapper.find({ testID: 'topUpInputField' });
      inputElement.simulate('changeText', '25000');
      const buttonElement = wrapper.find({ testID: 'topUpButton' });
      buttonElement.simulate('press');

      const { onPress: onPressConfirmButton } = Alert.alert.mock.calls[0][2][1];
      onPressConfirmButton();

      expect(mockedOnSubmit).toHaveBeenCalledWith('25000');
    });
  });
});
