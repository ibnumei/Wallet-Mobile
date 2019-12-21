import { shallow } from 'enzyme';
import React from 'react';
import TransactionFilterAmount from './TransactionFilterAmount';

jest.mock('@ptomasroos/react-native-multi-slider', () => {
  const MultiSlider = () => true;
  return MultiSlider;
});

describe('TransactionFilterAmount', () => {
  describe('#render', () => {
    let wrapper;
    let onChange;
    let expectedAmount;
    let firstMinAmount;
    let firstMaxAmount;
    let selectedMinAmount;
    let selectedMaxAmount;

    beforeEach(() => {
      onChange = jest.fn();
      firstMinAmount = 1000;
      firstMaxAmount = 20000;
      selectedMinAmount = 4000;
      selectedMaxAmount = 70000;

      expectedAmount = [selectedMinAmount, selectedMaxAmount];

      wrapper = shallow(
        <TransactionFilterAmount
          selectedMinValue={firstMinAmount}
          selectedMaxValue={firstMaxAmount}
          onChange={onChange}
        />
      );
    });

    it('should render text amount and slider amount', () => {
      expect(wrapper.find({ testID: 'text-amount' })).toHaveLength(1);
      expect(wrapper.find({ testID: 'slider-amount' })).toHaveLength(1);
    });

    it('should change the multislider value when the multislider is changed', async () => {
      wrapper = shallow(
        <TransactionFilterAmount
          selectedMinValue={selectedMinAmount}
          selectedMaxValue={selectedMaxAmount}
          onChange={onChange}
        />
      );

      expect(wrapper.find({ testID: 'slider-amount' }).props().values).toEqual(
        expectedAmount
      );
    });

    it('should call onChange with the selected values', () => {
      wrapper
        .find({ testID: 'slider-amount' })
        .simulate('valuesChange', expectedAmount);

      expect(onChange).toBeCalledWith(expectedAmount);
    });
  });
});
