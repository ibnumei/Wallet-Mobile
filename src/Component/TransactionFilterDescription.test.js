import React from 'react';
import { shallow } from 'enzyme';
import TransactionFilterDescription from './TransactionFilterDescription';

describe('TransactionFilterDescription', function() {
  describe('#render', function() {
    it('should render transaction filter field', function() {
      const onFilterMock = jest.fn();
      const wrapper = shallow(
        <TransactionFilterDescription onFilter={onFilterMock} />
      );

      expect(wrapper.find({ testID: 'inputFilter' })).toHaveLength(1);
    });

    it('should change the description input value as typed', () => {
      const inputtedText = 'test';
      const onFilterMock = jest.fn();
      const wrapper = shallow(
        <TransactionFilterDescription onFilter={onFilterMock} />
      );

      wrapper.find({ testID: 'inputFilter' }).simulate('changeText', 'test');

      expect(onFilterMock).toHaveBeenCalledWith(inputtedText);
    });
  });
});
